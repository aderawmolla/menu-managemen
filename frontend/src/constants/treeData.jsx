import { v4 as uuidv4 } from 'uuid';

export default [
    {
        id: uuidv4(), // UUID for the root node
        name: "System Management",
        depth: 0,
        isGroup: true,
        parentId: null,
        children: [
            {
                id: uuidv4(),
                name: "Systems",
                depth: 1,
                isGroup: true,
                parentId: "1",
                children: [
                    {
                        id: uuidv4(),
                        name: "System Code",
                        depth: 2,
                        isGroup: true,
                        parentId: "2",
                        children: [
                            {
                                id: uuidv4(),
                                name: "Code Registration",
                                depth: 3,
                                isGroup: false,
                                parentId: "3",
                                children: [],
                            },
                        ],
                    },
                    {
                        id: uuidv4(),
                        name: "Code Generation",
                        depth: 2,
                        isGroup: false,
                        parentId: "2",
                        children: [],
                    },
                    {
                        id: uuidv4(),
                        name: "Code Generation 2",
                        depth: 2,
                        isGroup: false,
                        parentId: "2",
                        children: [],
                    },
                    {
                        id: uuidv4(),
                        name: "Properties",
                        depth: 2,
                        isGroup: false,
                        parentId: "2",
                        children: [],
                    },
                    {
                        id: uuidv4(),
                        name: "Menu",
                        depth: 2,
                        isGroup: true,
                        parentId: "2",
                        children: [
                            {
                                id: uuidv4(),
                                name: "Menu Registration",
                                depth: 3,
                                isGroup: false,
                                parentId: "8",
                                children: [],
                            },
                        ],
                    },
                    {
                        id: uuidv4(),
                        name: "API List",
                        depth: 2,
                        isGroup: true,
                        parentId: "2",
                        children: [
                            {
                                id: uuidv4(),
                                name: "API Registration",
                                depth: 3,
                                isGroup: false,
                                parentId: "10",
                                children: [],
                            },
                            {
                                id: uuidv4(),
                                name: "API Edit",
                                depth: 3,
                                isGroup: false,
                                parentId: "10",
                                children: [],
                            },
                        ],
                    },
                ],
            },
            {
                id: uuidv4(),
                name: "User & Groups",
                depth: 1,
                isGroup: true,
                parentId: "1",
                children: [
                    {
                        id: uuidv4(),
                        name: "Users",
                        depth: 2,
                        isGroup: true,
                        parentId: "13",
                        children: [
                            {
                                id: uuidv4(),
                                name: "User Account Registration",
                                depth: 3,
                                isGroup: false,
                                parentId: "14",
                                children: [],
                            },
                        ],
                    },
                    {
                        id: uuidv4(),
                        name: "Groups",
                        depth: 2,
                        isGroup: true,
                        parentId: "13",
                        children: [
                            {
                                id: uuidv4(),
                                name: "User Group Registration",
                                depth: 3,
                                isGroup: false,
                                parentId: "16",
                                children: [],
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
