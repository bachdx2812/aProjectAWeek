<template>
  <div class="chat-wrapper">
    <div class="mainChat">
      <div
        v-for="message in messages"
        :key="message.id"
        class="message"
        :class="[ message.isBot ? 'botChat' : 'humanChat' ]"
      >
        <span v-if="message.isBot">{{ message.content }}</span>
        <HumanResponse v-else :message="message"></HumanResponse>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import HumanResponse from "./HumanResponse";

const END_POINT = "http://localhost:3000";

export default {
  components: {
    HumanResponse
  },
  data: function() {
    return {
      messages: [],
      newMessage: "",
      serverData: [],
      name: "",
      result: []
    };
  },
  created: async function() {
    await this.fetchQuestions();
    this.getNextConversation();
  },
  methods: {
    fetchQuestions: async function() {
      let response = await axios.get(`${END_POINT}/api/questions`);
      this.serverData = response.data;
    },
    submit: function(answer) {
      if (answer.type == 1) {
        this.name = answer.content;
      }
      this.result.push(answer);
      this.getNextConversation();
    },
    getNextConversation: function() {
      if (this.serverData.length == 0) {
        this.submitResult();
        return;
      }
      // get next conversation
      const nextConversation = this.serverData.shift();

      let content = "";
      // push vao messages
      if (nextConversation.isNameQuestion) {
        content = nextConversation.content.replace("{name}", this.name);
      } else {
        content = nextConversation.content;
      }

      this.messages.push({
        isBot: true,
        content: content
      });

      // neu message hien tai la conversation -> chay lai
      if (nextConversation.isQuestion) {
        const answer = {
          isBot: false,
          type: nextConversation.type,
          options: nextConversation.options
        };

        this.messages.push(answer);
      } else {
        this.getNextConversation();
      }
    },
    submitResult: async function() {
      await axios.post(`${END_POINT}/api/answer`, {
        answers: this.result
      });

      // say cam on
      this.messages.push({
        isBot: true,
        content: "thank you"
      });
    }
  }
};
</script>

<style scoped>
.mainChat {
  display: flex;
  flex-direction: column;
}

.message {
  padding: 10px;
  margin: 10px;
  border: 2px solid;
  border-color: transparent;
  border-radius: 25px;
}

.botChat {
  background-color: aqua;
}

.humanChat {
  align-self: flex-end;
  background-color: burlywood;
}

.input {
  display: flex;
  padding: 10px;
}
</style>