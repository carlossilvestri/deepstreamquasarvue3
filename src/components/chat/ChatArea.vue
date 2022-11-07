<script setup>
import { watch } from "vue";
import {
  client,
  record,
  text,
  dense,
  messages,
  onSend,
  onDeleteAll,
} from "./composables/chat";

// Login to deepstream
client.login();

// Update data...
record.subscribe("messages", function (values) {
  messages.value = values;
});
record.subscribe("text", function (values) {
  text.value = values;
});
watch(text, (value) => {
  record.set("text", value);
});
</script>

<template>
  <div class="q-pa-md row justify-center">
    <div style="width: 100%; max-width: 400px">
      <h3 class="text-h5">Quasar Chat with Deepstream</h3>
      <q-chat-message
        v-for="(msg, i) in messages"
        :key="`msg-${i}`"
        :text="[msg]"
      />

      <q-input
        bottom-slots
        v-model="text"
        label="Message"
        counter
        maxlength="12"
        :dense="dense"
        @keyup.enter="onSend"
      >
        <template v-slot:after>
          <q-btn @click="onSend" round dense flat icon="send" />
        </template>
      </q-input>
    </div>
    <div>
      <q-btn
        icon="delete"
        label="Messages"
        stack
        color="red"
        @click="onDeleteAll"
      />
    </div>
  </div>
</template>