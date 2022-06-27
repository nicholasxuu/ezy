import { CSS, styled } from '@nextui-org/react';
import React, { PropsWithChildren } from 'react';

import { CollapseButton } from './collapse.button';

const StyledTreeNode = styled('li', {
  display: 'flex',
  flexWrap: 'nowrap',
  paddingTop: 10,
  paddingBottom: 10,
  margin: 0,
  overflow: 'auto',

  '&:hover': {
    backgroundColor: '$accents1',
  },
});

const StyledCommandsPanelWrapper = styled('div', {
  // border: 'solid 1px red',
  display: 'flex',
  flexWrap: 'nowrap',
  marginLeft: 'auto',
  width: '50px',
});

export type TreeNodeProps = {
  id: string;
  content: string | React.ReactNode;

  onClick?: React.MouseEventHandler<HTMLLIElement>;

  css?: CSS;
};

export const TreeNode: React.FC<PropsWithChildren<TreeNodeProps>> = ({
  id,
  content,
  children,
  onClick,
  css,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const isCollapsible = !!children;

  const handleTreeNodeClick: React.MouseEventHandler<HTMLLIElement> = (event) => {
    if (isCollapsible) {
      setIsOpen(!isOpen);
    }

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <>
      <StyledTreeNode key={id} css={css} onClick={handleTreeNodeClick}>
        {content}
        <StyledCommandsPanelWrapper>
          {isCollapsible && <CollapseButton isOpen={isOpen} onClick={setIsOpen} />}
        </StyledCommandsPanelWrapper>
      </StyledTreeNode>
      {isOpen && children}
    </>
  );
};