import { json } from '@codemirror/lang-json';
import { oneDark } from '@codemirror/theme-one-dark';
import { Container, styled, Text } from '@nextui-org/react';
import CodeMirror from '@uiw/react-codemirror';
import React from 'react';

import { DraggableTabs } from '../../../components';

const StyledRequestHeader = styled('div', {
  backgroundColor: '#282c34',
  // backgroundColor: '$backgroundContrast',
});

export const Request: React.FC = () => {
  const tabs = [
    {
      id: '1',
      title: 'Request',
      active: true,
      content: (
        <CodeMirror
          value="console.log('hello world!');"
          height="auto"
          // 150px from top
          maxHeight="calc(100vh - 150px)"
          theme={oneDark}
          extensions={[json()]}
        />
      ),
    },
    {
      id: '2',
      title: 'Metadata',
      active: false,
      content: (
        <Container gap={0} fluid css={{ height: '100%', paddingTop: 20 }}>
          <Text> test2 </Text>
        </Container>
      ),
    },
  ];

  return (
    <StyledRequestHeader>
      <DraggableTabs
        tabs={tabs}
        // activeKey={getActiveTabId()}
        // onActivate={activateTab}
        // onClose={closeTab}
      />
    </StyledRequestHeader>
  );
};
