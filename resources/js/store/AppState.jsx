import axios from "axios";
import { observer } from "mobx-react-lite";
import * as React from "react";
import appState from "./appState";

const AppState = observer(() => {

    const [store] = React.useState(appState);
  
    React.useEffect(() => {
      axios.get(import.meta.env.VITE_APP_BASE_URL + '/api/catalog')
          .then(res => {
            let json = res.data;
            store.changeCategories(json);
          })
          .catch(err => {
          })
          .finally(() => {            
          });
    }, []);
  
  });
  export default AppState;