import { 
  Store, 
  Environment , 
  RecordSource } from 'relay-runtime';

import { 
  Network, 
  FetchFunction } from 'relay-runtime';
export { 
  QueryRenderer,
   graphql } from 'react-relay';
const RelayNetworkLogger = require('relay-runtime/lib/RelayNetworkLogger')


const store = new Store(new RecordSource())
//import RelayNetworkLogger from 'relay-runtime/lib/RelayNetworkLogger'

/**
 * Define fetch query
 */
const fetchQuery = (operation, variables) => {
  
  const localIP = "192.168.100.157";
  console.log("fetch", localIP, operation)
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  const fullUrl = `${proxyUrl}http://${localIP}:3000/graphql`
  console.log(fullUrl)
  return fetch(fullUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json();
  });
}
function callbackOffline(type, payload, error) {
  console.log("callbackoffline", type)
  console.log("callbackoffline", payload)
  console.log("callbackoffline", error)
}


/**
 * Network
 */
const network = Network.create(RelayNetworkLogger.wrapFetch(fetchQuery, () => ''));
export default network;

/**
 * Environment 
 */
export const environment = new Environment({ network, store });