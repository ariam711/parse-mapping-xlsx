import { TreeNodeType } from '../types/TreeNodeType';

/**
 * Walks through a tree, executes a callback on node matching id, and returns a
 * new tree with the updated node.
 * @param tree
 * @param id
 * @param callback
 */
export const findNodeByIdAndUpdate = (
  tree: TreeNodeType[],
  id: string,
  callback: (node: TreeNodeType) => TreeNodeType
): TreeNodeType[] => {
  const treeCopy: TreeNodeType[] = [];
  for (const node of tree) {
    let nodeCopy = { ...node };
    if (nodeCopy.key === id) {
      nodeCopy = callback(nodeCopy);
    }
    nodeCopy.children = findNodeByIdAndUpdate(node.children, id, callback);
    treeCopy.push(nodeCopy);
  }
  return treeCopy;
};
