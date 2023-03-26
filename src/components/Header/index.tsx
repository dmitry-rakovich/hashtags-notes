import './index.scss'

interface IHeaderProps {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onAdd: () => void;
    value: string;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Header: React.FC<IHeaderProps> = ({
    value,
    onAdd,
    handleChange,
    handleKeyDown,
}) => {
  return (
    <header className='header'>
            <input
                autoFocus
                type="text"
                className='form-control'
                onChange={e => handleChange(e)}
                placeholder="add new note"
                value={value}
                onKeyDown={e => handleKeyDown(e)}
            />
            <button onClick={onAdd} className='btn btn-primary'>Add</button>
        </header>
  )
}

export default Header