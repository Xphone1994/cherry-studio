import { useAssistant } from '@renderer/hooks/useAssistant'
import { useSettings } from '@renderer/hooks/useSettings'
import { Assistant, Topic } from '@renderer/types'
import { Flex } from 'antd'
import { FC } from 'react'
import styled from 'styled-components'

import Inputbar from './Inputbar/Inputbar'
import Messages from './Messages/Messages'
import RightSidebar from './RightSidebar'

interface Props {
  assistant: Assistant
  activeTopic: Topic
  setActiveTopic: (topic: Topic) => void
}

const Chat: FC<Props> = (props) => {
  const { assistant } = useAssistant(props.assistant.id)
  const { topicPosition } = useSettings()

  return (
    <Container id="chat">
      {topicPosition === 'left' && (
        <RightSidebar assistant={assistant} activeTopic={props.activeTopic} setActiveTopic={props.setActiveTopic} />
      )}
      <Main vertical flex={1} justify="space-between">
        <Messages assistant={assistant} topic={props.activeTopic} setActiveTopic={props.setActiveTopic} />
        <Inputbar assistant={assistant} setActiveTopic={props.setActiveTopic} />
      </Main>
      {topicPosition === 'right' && (
        <RightSidebar assistant={assistant} activeTopic={props.activeTopic} setActiveTopic={props.setActiveTopic} />
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  flex: 1;
  justify-content: space-between;
`

const Main = styled(Flex)`
  height: calc(100vh - var(--navbar-height));
`

export default Chat
