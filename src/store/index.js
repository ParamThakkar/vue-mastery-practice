import { createStore } from "vuex";
import * as user from '@/store/modules/user.js';
import * as event from '@/store/modules/event.js';
import * as notification from '@/store/modules/notification.js';

export default createStore({
  modules:{
    user,
    event,
    notification
  },
  state: {
    categories: [
      'a', 'b', 'c', 'd'
    ]
  }
});
