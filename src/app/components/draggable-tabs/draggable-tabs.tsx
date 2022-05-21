import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Text } from '@nextui-org/react';
import { TabPane } from 'rc-tabs';
import React from 'react';

import { DraggableTab } from './draggable-tab';
import { StyledDraggableTabs as StyledTabs } from './draggable-tabs.styled';

export interface TabPaneProps {
  id: string;

  title: string;

  content: React.ReactNode;
}

export interface DraggableTabsProps {
  tabs: TabPaneProps[];

  activeKey?: string;

  showAddButton?: boolean;

  closable?: boolean;

  onActivate?: (key: string) => void;

  onAdd?: () => void;

  onClose?: (key: string) => void;

  onDragEnd?: (event: DragEndEvent) => void;
}

export const DraggableTabs: React.FC<DraggableTabsProps> = ({
  tabs,
  activeKey,
  showAddButton = false,
  closable = false,
  onAdd = () => {},
  onClose = () => {},
  onActivate,
  onDragEnd,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 30,
      },
    })
  );

  const onTabsEdit = (
    type: string,
    info: { key?: string; event: React.MouseEvent | React.KeyboardEvent }
  ) => {
    if (type === 'remove' && info.key) {
      onClose(info.key);
    } else if (type === 'add') {
      onAdd();
    }
  };

  return (
    <StyledTabs
      animated={{ inkBar: true, tabPane: false }}
      editable={{
        showAdd: showAddButton,
        addIcon: <FontAwesomeIcon icon={faPlus} />,
        onEdit: onTabsEdit,
      }}
      activeKey={activeKey}
      onChange={onActivate}
      renderTabBar={(props, DefaultTabBar) => (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={tabs} strategy={horizontalListSortingStrategy}>
            <DefaultTabBar {...props}>
              {(node) => <DraggableTab id={node.key as string}>{node}</DraggableTab>}
            </DefaultTabBar>
          </SortableContext>
        </DndContext>
      )}
    >
      {tabs.map((tab) => (
        <TabPane
          key={tab.id}
          tab={
            <Text h6 weight="light">
              {tab.title}
            </Text>
          }
          closable={closable}
          closeIcon={<FontAwesomeIcon size="sm" icon={faXmark} />}
        >
          {tab.content}
        </TabPane>
      ))}
    </StyledTabs>
  );
};
