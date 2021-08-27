import { createRouter, createWebHistory } from "vue-router";
import EventCreate from "../views/EventCreate.vue";
import EventList from "../views/EventList.vue";
import EventShow from "@/views/EventShow.vue";
import NotFound from "@/components/NotFound.vue";
import NetworkIssue from "@/components/NetworkIssue.vue";
import store from "@/store";
import NProgress from 'nprogress';

const routes = [
  {
    path: "/",
    name: "event-list",
    component: EventList,
    props: true
  },
  {
    path: "/event/:id",
    name: "event-show",
    component: EventShow,
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store.dispatch('event/fetchEvent', routeTo.params.id).then((response) => {
        routeTo.params.event = response
        next()
      })
      .catch((error)=>{
        if(error.response && error.response.status == 404)
          next({name:'404',params:{resource:'event'}})
        next({name:'network-issue'})
      })
    }
  },
  {
    path: "/event/create",
    name: "event-create",
    component: EventCreate
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    props:true
  },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: NetworkIssue
  },
  {
    path: '/:catchAll(.*)',
    redirect: { name: '404',params:{resource:'page'} }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  next()
})

router.afterEach((routeTo, routeFrom) => {
  NProgress.done()
})

export default router;
