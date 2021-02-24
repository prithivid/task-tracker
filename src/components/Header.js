import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'

const Header = ({ title, onAdd, showAddTask }) => {
  const currentLocation = useLocation()
  return (
    <header className="header">
      <h1>{title}</h1>
      {currentLocation.pathname === '/' && (
        <Button
          color={showAddTask ? 'red' : 'green'}
          text={showAddTask ? 'Close' : 'Add'}
          onClick={onAdd}
        />
      )}
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string,
}

Header.defaultProps = {
  title: 'Task Tracker',
}

export default Header
