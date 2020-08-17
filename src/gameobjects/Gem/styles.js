import { makeStyles } from '@material-ui/styles';

export default makeStyles({
  root: props => ({
    left: props.position.x,
    top: props.position.y,
    position: 'absolute',
    width: `${props.size}px`,
    height: `${props.size}px`,
    pointerEvents: !props.isPlayable && 'none',
    background: props.isPlayable && 'radial-gradient(rgba(35, 32, 39, 0.63), rgb(35, 32, 39))',
    userSelect: 'none',
    '& > img': {
      pointerEvents: 'none',
    },
  }),
});
