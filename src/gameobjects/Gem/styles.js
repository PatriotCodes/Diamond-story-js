import { makeStyles } from '@material-ui/styles';
import { pickGemColor } from '../../styles/colors';

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
      position: 'absolute',
      zIndex: 1,
    },
  }),
  effectDiv: props => ({
    width: 0,
    height: 0,
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: `0px 0px 10px 20px rgba(${pickGemColor(props.gemType)}, 0.6)`,
    zIndex: 2,
  }),
});
