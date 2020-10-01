import cookie from 'js-cookie';
import Router from 'next/router';

export default function WithAuth(WrappedComponent) {
  return class extends React.Component {
    state = {
      token: cookie.get('_SID_') || null,
    };

    // static async getInitialProps(ctx) {
    //   const token = ctx?.req?.headers?.cookie;
    //   const initialProps = { token };

    //   if (WrappedComponent.getServerSideProps) {
    //     return WrappedComponent.getServerSideProps(initialProps);
    //   }

    //   return initialProps;
    // }

    componentDidMount() {
      const token = cookie.get('_SID_');

      if (!token) {
        Router.push('/login');
      }

      this.setState({
        token,
      });
    }

    render() {
      return <WrappedComponent token={this.state.token} />;
    }
  };
}
