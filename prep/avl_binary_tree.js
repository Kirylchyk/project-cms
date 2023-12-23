class AVLTreeNode {
    constructor(value) {
        this.value = value;    // The value of the node
        this.height = 1;       // Height of the node
        this.left = null;      // Left child
        this.right = null;     // Right child
        this.count = 1;        // Count of nodes with the same value
    }
}

class AVLTree {
    constructor() {
        this.root = null;      // Root of the AVL Tree
    }

    // Count the number of nodes in the tree
    countNodes() {
        return this._countNodes(this.root);
    }

    // Helper function to count nodes in a subtree
    _countNodes(node) {
        if (!node) {
            return 0;
        }
        return 1 + this._countNodes(node.left) + this._countNodes(node.right);
    }

    // Helper function to get the height of a node (handles null nodes)
    _getHeight(node) {
        return node ? node.height : 0;
    }

    // Get the height of the tree
    getHeight() {
        return this._getHeight(this.root);
    }

    // Helper function to update the height of a node based on its children
    _updateHeight(node) {
        node.height = Math.max(this._getHeight(node.left), this._getHeight(node.right)) + 1;
    }

    // Helper function to perform a right rotation
    _rotateRight(y) {
        const x = y.left;
        const T2 = x.right;

        // Perform rotation
        x.right = y;
        y.left = T2;

        // Update heights
        this._updateHeight(y);
        this._updateHeight(x);

        return x; // New root
    }

    // Helper function to perform a left rotation
    _rotateLeft(x) {
        const y = x.right;
        const T2 = y.left;

        // Perform rotation
        y.left = x;
        x.right = T2;

        // Update heights
        this._updateHeight(x);
        this._updateHeight(y);

        return y; // New root
    }

    // Helper function to get balance factor of a node
    _getBalanceFactor(node) {
        return node ? this._getHeight(node.left) - this._getHeight(node.right) : 0;
    }

    // Balances a node and returns the new root
    _balance(node) {
        // Update height of this node
        this._updateHeight(node);

        // Get balance factor
        const balance = this._getBalanceFactor(node);

        // Left Heavy (Right Rotation)
        if (balance > 1 && this._getBalanceFactor(node.left) >= 0) {
            return this._rotateRight(node);
        }

        // Right Heavy (Left Rotation)
        if (balance < -1 && this._getBalanceFactor(node.right) <= 0) {
            return this._rotateLeft(node);
        }

        // Left Right Heavy (Left Right Rotation)
        if (balance > 1 && this._getBalanceFactor(node.left) < 0) {
            node.left = this._rotateLeft(node.left);
            return this._rotateRight(node);
        }

        // Right Left Heavy (Right Left Rotation)
        if (balance < -1 && this._getBalanceFactor(node.right) > 0) {
            node.right = this._rotateRight(node.right);
            return this._rotateLeft(node);
        }

        return node; // No rotation needed
    }

    // Inserts a value into the AVL Tree
    insert(value) {
        this.root = this._insert(this.root, value);
    }

    _insert(node, value) {
        if (!node) {
            return new AVLTreeNode(value);
        }

        if (value < node.value) {
            node.left = this._insert(node.left, value);
        } else if (value > node.value) {
            node.right = this._insert(node.right, value);
        } else {
            // Duplicate value, increase count
            node.count++;
        }

        return this._balance(node);
    }

    // Removes a value from the AVL Tree
    remove(value) {
        this.root = this._remove(this.root, value);
    }

    _remove(node, value) {
        if (!node) {
            return node;
        }

        if (value < node.value) {
            node.left = this._remove(node.left, value);
        } else if (value > node.value) {
            node.right = this._remove(node.right, value);
        } else {
            if (node.count > 1) {
                node.count--;
                return this._balance(node);
            }

            if (!node.left || !node.right) {
                node = node.left || node.right;
            } else {
                const temp = this._findMinNode(node.right);
                node.value = temp.value;
                node.count = temp.count;
                node.right = this._remove(node.right, temp.value);
            }
        }

        if (node == null) return node;

        return this._balance(node);
    }

    // Find the node with the minimum value in a given subtree
    _findMinNode(node) {
        let current = node;
        while (current.left) {
            current = current.left;
        }
        return current;
    }

    // Searches for a value in the AVL Tree and returns true if found
    search(value) {
        return this._search(this.root, value);
    }

    _search(node, value) {
        if (!node) {
            return false;
        }

        if (value === node.value) {
            return true;
        } else if (value < node.value) {
            return this._search(node.left, value);
        } else {
            return this._search(node.right, value);
        }
    }
}

// Example usage:
const avlTree = new AVLTree();
avlTree.insert(10);
avlTree.insert(20);
avlTree.insert(30);
avlTree.insert(40);
avlTree.insert(50);
avlTree.insert(25); // Inserting a duplicate value (increases count)

console.log(avlTree.search(30)); // Output: true (30 is in the tree)
console.log(avlTree.search(15)); // Output: false (15 is not in the tree)

console.log(avlTree.getHeight()); // Output: 3
console.log(avlTree.countNodes()); // Output: 6 (Number of nodes in the tree)

avlTree.remove(30); // Remove one occurrence of 30
avlTree.remove(25); // Remove the duplicate value 25

console.log(avlTree.search(30)); // Output: false (30 has been removed)
console.log(avlTree.search(25)); // Output: false (25 has been removed)




