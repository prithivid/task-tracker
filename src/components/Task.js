import { FaTimes } from 'react-icons/fa'
import Tooltip from '@material-ui/core/Tooltip'

const Task = ({ task, onDelete, onToggle }) => {
  return (
    <Tooltip title="Double click to set reminder">
      <div
        className={`task ${task.reminder ? 'reminder' : ''}`}
        onDoubleClick={() => onToggle(task.id)}
      >
        <h3>
          {task.text}{' '}
          <FaTimes
            style={{ color: 'red', cursor: 'pointer' }}
            onClick={() => onDelete(task.id)}
          />
        </h3>
        <p>{task.day}</p>
      </div>
    </Tooltip>
  )
}

export default Task
