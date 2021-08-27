import EventService from '@/services/EventService.js';

export const namespaced = true;

export const state = {
    events: [],
    totalEvents: 0,
    event: {},
    perPage:3
}

export const mutations = {
    ADD_EVENT(state, event) {
        state.events.push(event)
    },
    SET_EVENTS(state, events) {
        state.events = events;
    },
    SET_TOTALCOUNT(state, count) {
        state.totalEvents = count;
    },
    SET_EVENT(state, event) {
        state.event = event;
    }
}

export const actions = {
    createEvent({ commit ,dispatch}, event) {
        return EventService.postEvent(event).then(response => {
            commit('ADD_EVENT', event)
            var notification = {
                type:'success',
                message:'Your event has been created'
            }
            dispatch('notification/add',notification,{root:true})
        })
        .catch(error => {
            var notification = {
                type:'error',
                message:'There was a problem creating your event:'+error.message
            }
            dispatch('notification/add',notification,{root:true})
            throw error;
        })
    },
    fetchEvents({ commit,dispatch,state }, {  page }) {
        return EventService.getEvents(state.perPage, page)
            .then(response => {
                commit('SET_TOTALCOUNT', response.headers['x-total-count'])
                commit('SET_EVENTS', response.data);
            })
            .catch(error => {
                var notification = {
                    type:'error',
                    message:'There was a problem fetching events:'+error.message
                }
                dispatch('notification/add',notification,{root:true})
            })
    },
    fetchEvent({ commit, getters,dispatch }, id) {
        var event = getters.getEventById(id);
        if (event) {
            commit('SET_EVENT', event)
            return event
        }
        else {
            return EventService.getEvent(id)
                .then((response) => {
                    commit('SET_EVENT', response.data)
                    return response.data
                })
        }
    }
}

export const getters = {
    getEventById: (state) => (id) => {
        return state.events.find(x => x.id == id)
    }
}