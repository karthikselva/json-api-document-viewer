import React from 'react';
import Entity from './Entity';
import JsonApiDataStore from 'jsonapi-datastore';

class App extends React.Component {
  componentWillMount() {
    const store = new JsonApiDataStore.JsonApiDataStore();
    this.setState({
      docString: JSON.stringify(this.props.doc, null, 2),
      store: store.sync(this.props.doc),
      jsonState: '✅'
    });
  }

  handleChange(event) {
    const jsonInput = event.target.value;
    this.setState({ docString: jsonInput });
    try {
      const store = new JsonApiDataStore.JsonApiDataStore();
      const updatedStore = store.sync(JSON.parse(jsonInput));
      let arrayStore;

      if (updatedStore instanceof Array) {
        arrayStore = updatedStore.slice();
      } else {
        arrayStore = [updatedStore].slice();
      }

      this.setState({
        store: arrayStore,
        jsonState: '✅'
      });
    } catch (e) {
      this.setState({
        jsonState: `❌ ${e}`
      });
    }
  }

  render() {
    return (
      <div>
        <a href="https://github.com/tadast/json-api-document-viewer"><img className="gh-ribon" src="https://camo.githubusercontent.com/a6677b08c955af8400f44c6298f40e7d19cc5b2d/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677261795f3664366436642e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png" /></a>
        <header>
          <h1>{'{json:api}'} document viewer</h1>
        </header>
        <section>
          <div className="json-input half-floater">
            <div className="form-info form-header">{'{json:api}'} document:</div>
            <textarea onChange={(e) => this.handleChange(e)} value={this.state.docString} />
            <div className="form-info form-footer">
              <span className="state">
                <strong>JSON validity:</strong> {this.state.jsonState}
              </span>
              <span className="state">
                <strong>{'{json:api}'} validity:</strong> ??? (not implemented yet)
              </span>
            </div>
          </div>
          <div className="json-visualisation half-floater">
            <div className="form-info form-header">Document tree</div>
            {this.state.store.map(
              (entity, idx) => (<Entity key={idx} data={entity} relName="Root element" />)
            )}
          </div>
        </section>
      </div>
    );
  }

}

App.propTypes = { doc: React.PropTypes.object.isRequired };

export default App;
