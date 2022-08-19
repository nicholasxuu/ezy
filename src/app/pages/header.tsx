import { faCog, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container } from '@nextui-org/react';
import React from 'react';

import { CreateCollectionModal } from './collections';
import { UpdateSettingsModal } from './settings';

export const Header: React.FC = () => {
  const [createCollectionModalVisible, setCreateCollectionModalVisible] = React.useState(false);
  const [updateSettingsModalVisible, setUpdateSettingsModalVisible] = React.useState(false);

  return (
    <Container fluid display="flex" wrap="nowrap" justify="center" alignItems="center">
      <Button
        auto
        bordered
        borderWeight="light"
        color="gradient"
        size="sm"
        icon={<FontAwesomeIcon icon={faSquarePlus} />}
        onClick={() => setCreateCollectionModalVisible(true)}
        css={{
          marginLeft: 'auto',
        }}
      >
        New collection
      </Button>
      <Button
        auto
        light
        size="xs"
        color="warning"
        css={{
          marginLeft: 'auto',
          minWidth: 10,
          color: '$accents9',
          '&:hover': {
            color: '$warning',
            backgroundColor: '$accents0',
          },
        }}
        icon={<FontAwesomeIcon icon={faCog} />}
        onClick={() => setUpdateSettingsModalVisible(true)}
      />
      <CreateCollectionModal
        fullScreen
        closeButton
        open={createCollectionModalVisible}
        onClose={() => setCreateCollectionModalVisible(false)}
      />
      <UpdateSettingsModal
        closeButton
        blur
        open={updateSettingsModalVisible}
        onClose={() => setUpdateSettingsModalVisible(false)}
      />
    </Container>
  );
};
