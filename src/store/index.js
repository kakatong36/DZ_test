import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import header from './modules/header';
import footer from './modules/footer';
import dialog from './modules/dialog';
import personal from './modules/personal';
import relate from './modules/relate';
import couple from './modules/couple';
import toMap from './modules/toMap';
import messageNew from './modules/messageNew';

export default new vuex.Store({
  modules: {
    header: header,
    footer: footer,
    dialog: dialog,
    personal:personal,
    relate:relate,
	couple:couple,
	toMap: toMap,
	messageNew: messageNew
  }
})
