export default function Message({ message, condition }) {
  return condition ? <p className="formMessage">{message}</p> : <></>;
}
