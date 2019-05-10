import React from "react";

class Badges extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          sampleData: "test",
      };
  }

  componentDidMount() {
      console.log('I mounted!');
  }
  
  render() {
      return(<div>IS THIS WHERE I PUT MY HTML CODE???</div>)
  }
}

export default Badges;