document.title = '二叉树';

((w, d, undefined) => {
    /**** 二叉树 ****/
    /**
     * 二叉树是一种特殊的树，它的子节点不超过两个
     * 相对较小的值保存在左节点中，较大的值保存在右节点中
     */
    function BST(){
        // 节点
        function Node(data) {
            this.data = data;
            this.left = null;
            this.right = null;
        }
        this.length = 0;
        // 根节点
        let root = null;
        /**
         * 往树中添加新节点
         * 1、先检查树中是否存在根节点，不存在的话新节点就为根节点
         * 存在的话，遍历查询
         * 2、如果待插入数据小于当前节点，则设新的当前节点为原节点的左节点；反之，执行第4步
         * 3、如果当前节点的左节点为null，就将新的节点插入这个位置，退出循环；反之，继续执行下一次循环
         * 4、设置新的当前节点为原节点的右节点
         * 5、如果当前节点的右节点为null，就将新的节点插入这个位置，退出循环；反之，继续执行下一次循环
         */
        this.insert = data => {
            let newNode = new Node(data);
            this.length++;
            if(root == null){
                root = newNode;
                return;
            }
            insetNode(root, newNode);
        };
        /**
         * 节点插入
         * @param {Object} node 被插入节点
         * @param {Object} newNode 新节点
         */
        const insetNode = (node, newNode) => {
            if(newNode.data < node.data){
                // 左节点查询插入
                if(node.left == null){
                    node.left = newNode;
                    return;
                }
                insetNode(node.left, newNode);
            } else {
                // 右节点查询插入
                if(node.right == null){
                    node.right = newNode;
                    return;
                }
                insetNode(node.right, newNode);
            }
        };
        /**
         * 中序遍历
         */
        this.inOrderTraverse = callback => {
            inOrderTraverseNode(root, callback);
        };
        /**
         * 中序遍历节点
         * @param {Object} node 遍历节点
         * @param {Function} callback 回调
         */
        const inOrderTraverseNode = (node, callback) => {
            if(node !== null){
                inOrderTraverseNode(node.left, callback);
                callback(node.data);
                inOrderTraverseNode(node.right, callback);
            }
        };
        /**
         * 前序遍历节点
         * @param {Object} node 遍历节点
         * @param {Function} callback 回调
         */
        const preOrderTraverseNode = (node, callback) => {
            if(node !== null){
                callback(node.data);
                preOrderTraverseNode(node.left, callback);
                preOrderTraverseNode(node.right, callback);
            }
        };
        /**
         * 前序遍历
         */
        this.preOrderTraverse = callback => {
            preOrderTraverseNode(root, callback);
        };
        /**
         * 后序遍历节点
         * @param {Object} node 遍历节点
         * @param {Function} callback 回调
         */
        const postOrderTraverseNode = (node, callback) => {
            if(node !== null){
                postOrderTraverseNode(node.left, callback);
                postOrderTraverseNode(node.right, callback);
                callback(node.data);
            }
        };
        /**
         * 后序遍历
         */
        this.postOrderTraverse = callback => {
            postOrderTraverseNode(root, callback);
        };
        /**
         * 广度遍历
         */
        this.breadthOrderTraverse = callback => {
            breadthOrderTraverseNode(root, callback);
        };
        /**
         * 广度遍历
         * @param {Object} node 遍历节点
         * @param {Function} callback 回调
         */
        const breadthOrderTraverseNode = (node, callback) => {
            if(node !== null){
                let que = [node];
                while(que.length !== 0){
                    node = que.shift();
                    callback(node.data);
                    if(node.left){
                        que.push(node.left);
                    }
                    if(node.right){
                        que.push(node.right);
                    }
                }
            }
        };
        /**
         * 查询树中最小值
         */
        this.min = () => {
            return minNode(root);
        };
        /**
         * 获取最小树节点
         * @param {Object} node 查询节点
         */
        const minNode = node => {
            // 备份一下， 规避，eslint规则
            let newNode = node;
            if(newNode){
                while(newNode && newNode.left !== null){
                    newNode = newNode.left;
                }
                return newNode.data;
            }
            return null;
        }
        /**
         * 查询树中最大值
         */
        this.max = () => {
            return maxNode(root);
        };
        /**
         * 获取最大树节点
         * @param {Object} node 查询节点
         */
        const maxNode = node => {
            // 备份一下， 规避，eslint规则
            let newNode = node;
            if(newNode){
                while(newNode && newNode.right !== null){
                    newNode = newNode.right;
                }
                return newNode.data;
            }
            return null;
        };
        /**
         * 查询节点
         */
        this.find = data => {
            return findNode(root, data);
        };
        /**
         * 查询节点
         * @param {Object} node 查询节点
         * @param {*} data 匹配数据
         */
        const findNode = (node, data) => {
            if(node === null){
                return null;
            }
            if(data < node.data){
                return findNode(node.left, data);
            }
            if(data > node.data){
                return findNode(node.right, data);
            }
            return true;
        }
        /**
         * 删除节点
         * 判断当前节点是否包含待删除的数据，如果包含，则删除该节点，如果不包含，则比较当前节点上的数据和待删除的数据
         * 如果待删除数据小于当前节点上的数据，则移至当前节点的左节点继续比较，如果大于，则移至当前节点的右子节点继续比较
         * 如果待删除节点是叶子节点(没有子节点的节点)，那么只需要将从父节点指向它的链接指向null
         * 如果待删除节点只包含一个子节点，那么原本指向它的节点就得做些调整，使其指向它的子节点
         * 如果待删除节点包含两个子节点，查找其右子节点树上的最小值
         */
        this.remove = data => {
            root = removeNode(root, data);
        };
        /**
         * 删除节点 -- 递归
         * @param {Object} node 查询节点
         * @param {*} data 匹配数据
         */
        const removeNode = (node, data) => {
            if(node === null){
                return null;
            }
            if(data < node.data){
                node.left = removeNode(node.left, data);
                return node;
            }
            if(data > node.data){
                node.right = removeNode(node.right, data);
                return node;
            }
            // 没有子节点的情况
            if(node.left === null && node.right === null){
                node = null;
                return node;
            }
            // 只有一个子节点
            if(node.left === null){
                node = node.right;
                return node;
            }
            if(node.right === null){
                node = node.right;
                return node;
            }
            // 存在两个子节点
            let aux = minNode(node.right);
            node.data = aux.data;
            node.right = removeNode(node.right, aux.data);
            return node;
        };
    }
    w.BST = BST;
})(window, document);

function test1(){
    let nums = new BST();
    nums.insert(23);
    nums.insert(45);
    nums.insert(16);
    nums.insert(37);
    nums.insert(3);
    nums.insert(99);
    nums.insert(22);
    console.log("Inorder traversal: ");
    nums.inOrderTraverse(data => {
        console.log(`inOrderTraverse: ${data}`);
    });
    nums.preOrderTraverse(data => {
        console.log(`preOrderTraverse: ${data}`);
    });
    nums.postOrderTraverse(data => {
        console.log(`postOrderTraverse: ${data}`);
    });
    nums.breadthOrderTraverse(data => {
        console.log(`breadthOrderTraverse: ${data}`);
    });
    console.log(nums);
}

test1();