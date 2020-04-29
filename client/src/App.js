import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import Layout from './Layout';
import Main from './modules/Main';
import User from './modules/User';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
});

const App = () => (
    <ApolloProvider client={client}>
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path='/' component={ Main } />
                    <Route exact path='/user/:userId' component={ User } />
                </Switch>
            </Layout>
        </BrowserRouter>
    </ApolloProvider>
);

export default App;