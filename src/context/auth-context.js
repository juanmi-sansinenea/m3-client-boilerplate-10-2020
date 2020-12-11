import React from 'react';
import authService from './../lib/auth-service';

const { Consumer, Provider } = React.createContext();

// This class passes auth data to any component wrapped around <Consumer> in any file of the application.
// Note withAuth: What we do is to create a Higher Order Component (HOC) named withAuth, here at the bottom
// where we use the Consumer just once: From now, we can export any component together with withAuth, so that it receives all the variables
// Note App: For this whole thing to work, we need to wrapp the whole <App /> around <Authprovider>
class AuthProvider extends React.Component {
  state = {
    isLoggedIn: false,
    isLoading: true,
    user: null
  }

  componentDidMount () {
    // authService is a file used to manage connetions to axios
    // connections can also be done manually inside each of the functions
    // as seen in auth-context-without-services, which is currently innactive
    authService.me()
     .then((user) => this.setState({ isLoggedIn: true, user: user, isLoading: false }))
     .catch((err) => this.setState({ isLoggedIn: false, user: null, isLoading: false }));
  }

  signup = (username, password) => {
    authService.signup( username, password )
      .then((user) => this.setState({ isLoggedIn: true, user }) )
      .catch((err) => {
        this.setState({ isLoggedIn: false, user: null });
      })
  }

  login = (username, password) => {
    authService.login( username, password )
      .then((user) => this.setState({ isLoggedIn: true, user }))
      .catch((err) => {
        this.setState({ isLoggedIn: false, user: null });
      })
  }

  logout = () => {
    authService.logout()
      .then(() => this.setState({ isLoggedIn: false, user: null }))
      .catch((err) => console.log(err));
  }


  render() {
    const { isLoggedIn, isLoading, user } = this.state;
    const { signup, login, logout } = this;

    if (isLoading) return <p>Loading</p>;

    return(
      // this line is passing all the variables to the Consumer, wherever it may be
      <Provider value={{ isLoggedIn, isLoading, user, signup, login, logout }}  >
        {this.props.children}
      </Provider>
    )
  }

}


// HOC that converts regular component into a Consumer
const withAuth = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      return(
        <Consumer>
          { (value) => {
            const { isLoggedIn, isLoading, user, signup, login, logout } = value;

            return (<WrappedComponent 
                      {...this.props}
                      isLoggedIn={isLoggedIn} 
                      isLoading={isLoading} 
                      user={user} 
                      signup={signup} 
                      login={login} 
                      logout={logout}
                    />)

          } }
        </Consumer>
        )
    }
}
}


export { AuthProvider, withAuth }