// 'use strict';
//
// const e = React.createElement;
//
// class LikeButton extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { liked: false };
//   }
//
//   render() {
//     if (this.state.liked) {
//       return '<h2>You liked this.</h2>';
//     }
//
//     return e(
//       'button',
//       { onClick: () => this.setState({ liked: true }) },
//       'Like'
//     );
//   }
// }

class Topbar_Btns extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render() {
    return <button>Button {props.number}</button>;
  }
}

class Topbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topbar_btns: Array(4).fill(null)
    };
  }

  render() {
    return (
        <div>
          <Topbar_Btns number = '1'/>
          <Topbar_Btns number = '2'/>
          <Topbar_Btns number = '3'/>
          <Topbar_Btns number = '4'/>
          <Topbar_Btns number = '5'/>
        </div>
      );
  }
}

ReactDom.render(<Topbar />, document.getElementByID('root'));

// const domContainer = document.querySelector('#like_button_container');
// ReactDOM.render(e(LikeButton), domContainer);
