import { useState, useEffect, useContext } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { ListGroup } from 'reactstrap';
import ShareBnB from '../api/api';
import UserContext from "../auth/UserContext";

import MessageCard from './MessageCard';

/** MessageList for current user
 * Context:
 * - currentUSer
 *
 * State:
 * - messages: {sent:[], received:[], isLoading}
 *
 * App -> RouteList -> MessageList
 */

function MessageList() {

  const { currentUser } = useContext(UserContext);
  const [messages, setMessages] = useState({
    sent: [],
    received: [],
    isLoading: true
  });


  // TODO: change name of effect
  /* calls api to get messages sent and received */
  useEffect(function fetchPropertiesList() {
    async function fetchMessages() {
      const sentRes = await ShareBnB.getMsgsSent(currentUser.username);
      const receivedRes = await ShareBnB.getMsgsReceived(currentUser.username);
      setMessages({
        sent: sentRes,
        received: receivedRes,
        isLoading: false
      });
    }
    fetchMessages();
    // TODO: is this really needed?
  }, [currentUser]);

  if (messages.isLoading) return <i>Loading...</i>;

  return (
    <div style={{ backgroundColor: "white", }}>
      <Tabs
        defaultActiveKey="inbox"
        transition={false}
        id="noanim-tab-example"
        className="mb-3"
      >
        {/* RECEIVED MESSAGES */}
        <Tab eventKey="inbox" title="Messages Received">
          {messages.received.length
            ? (
              <ListGroup>
                {messages.received.map(m => (
                  <MessageCard
                    key={m.id}
                    from={m.from_user}
                    sent={m.sent_at}
                    body={m.body}
                  />
                ))}
              </ListGroup>
            ) : (
              <p className="lead">Sorry, you dont have any messages!</p>
            )}
        </Tab>

        {/* SENT MESSAGES */}
        <Tab eventKey="outbox" title="Messages Sent">
          {messages.sent.length
            ? (
              <ListGroup>
                {messages.sent.map(m => (
                  <MessageCard
                    key={m.id}
                    to={m.to_user}
                    sent={m.sent_at}
                    body={m.body}
                  />
                ))}
              </ListGroup>
            ) : (
              <p className="lead">Sorry, you don't have any messages!</p>
            )}
        </Tab>

      </Tabs>
    </div>
  );
}

export default MessageList;