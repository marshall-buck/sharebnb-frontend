import { ListGroupItem } from "reactstrap";

/** Card for a Message
 *
 * Props:
 * - {sent, from, to, body}
 *
 * MessageList -> MessageCard
 */

function MessageCard({ sent, from = null, to = null, body }) {

  return (
    <ListGroupItem>
      {from && <h5>Message from @{from.username}</h5>}
      {to && <h5>Message to @{to.username}</h5>}
      <p>Sent {sent}</p>
      <p>{body}</p>
    </ListGroupItem>
  );
}

export default MessageCard;