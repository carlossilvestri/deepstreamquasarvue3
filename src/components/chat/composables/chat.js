import { ref } from "vue";
const { DeepstreamClient } = window.DeepstreamClient;

export const text = ref("");
export const dense = ref(false);
export const messages = ref([]);
export const client = new DeepstreamClient("localhost:6020");
export const record = client.record.getRecord("some-name");

/**
 * This function is used to update meesages array reactie array.
 * @params No parameters
 * @return void
 */
export const onSend = () => {
    const msg = text.value;
    messages.value.push(msg);
    record.set('messages', messages.value)
    text.value = "";
};
/**
 * This function is used to delete meesages array reactie array.
 * @params No parameters
 * @return void
 */
export const onDeleteAll = () => {
    messages.value = [];
    record.set('messages', messages.value)
}