import { TreeNodeType } from '../types/TreeNodeType';

/**
 * Walks through a tree, executes a callback on node matching id, and returns a
 * new tree with the updated node.
 * @param tree
 * @param id
 * @param runOnNode
 * @param runOnChildren
 */
export const findNodeByIdAndUpdate = (
  tree: TreeNodeType[],
  id: string,
  runOnNode: (node: TreeNodeType) => TreeNodeType,
  runOnChildren?: (node: TreeNodeType) => TreeNodeType
): TreeNodeType[] => {
  const treeCopy: TreeNodeType[] = [];
  for (const node of tree) {
    let nodeCopy = { ...node };
    if (nodeCopy.key === id) {
      nodeCopy = runOnNode(nodeCopy);
      if (runOnChildren) {
        nodeCopy.children = walkTreeAndRun(node.children, runOnChildren);
        treeCopy.push(nodeCopy);
        continue;
      }
    }
    nodeCopy.children = findNodeByIdAndUpdate(node.children, id, runOnNode, runOnChildren);
    treeCopy.push(nodeCopy);
  }
  return treeCopy;
};

/**
 * Walks through a tree node array and executes the callback on each node.
 * @param tree
 * @param runOnNode
 */
export const walkTreeAndRun = (
  tree: TreeNodeType[],
  runOnNode: (node: TreeNodeType) => TreeNodeType
): TreeNodeType[] => {
  const treeCopy: TreeNodeType[] = [];
  for (const node of tree) {
    let nodeCopy = { ...node };
    nodeCopy = runOnNode(nodeCopy);
    nodeCopy.children = walkTreeAndRun(node.children, runOnNode);
    treeCopy.push(nodeCopy);
  }
  return treeCopy;
};
