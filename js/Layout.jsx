const React = require('react')

const Layout = (props) => (
  <div className="app-container">
    <h1>My Branding</h1>
    {props.children}
  </div>
)

const { element } = React.PropTypes

Layout.propTypes = {
  children: element.isRequired
}

module.exports = Layout
