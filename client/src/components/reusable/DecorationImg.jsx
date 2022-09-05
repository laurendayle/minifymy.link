

const DecorationImg = (props) => {

  const style = {
    height: props?.height,
    width: props?.width,
    top: props?.top,
    right: props?.right ? props.right : "",
    position: "absolute",
    left: props?.left ? props.left : "",
    transform: props?.transform ? props.transform : "",
  }

  return (
    <div style={style}>
      <img src={props?.src} height="100%" width="100%" alt={props?.alt}/>
    </div>
  )
}

export default DecorationImg;