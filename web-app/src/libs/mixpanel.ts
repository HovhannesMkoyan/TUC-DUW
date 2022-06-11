import mixpanel from "mixpanel-browser";
mixpanel.init(process.env.REACT_APP_API_ENDPOINT as string);

let env_check = process.env.NODE_ENV === "production";

let actions = {
  identify: (id: any) => {
    if (env_check) {
      mixpanel.identify(id);
    }
  },
  alias: (id: any) => {
    if (env_check) mixpanel.alias(id);
  },
  track: (name: any, props?: any) => {
    if (env_check) mixpanel.track(name, props);
  },
  people: {
    set: (props: any) => {
      if (env_check) mixpanel.people.set(props);
    },
  },
};

export let Mixpanel = actions;
