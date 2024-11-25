import { defineStore } from "pinia";

export const useBonusStore = defineStore("bonus", {
  state: () => ({
    data: {
      bonuses: 850,
      score: 850,
      level_groups: [
        {
          id: 1,
          name: "\u041d\u043e\u0432\u0438\u0447\u043e\u043a",
          image: "/storage/levels/beginner.png",
          from_level: 1,
          created_at: "2024-09-19T09:21:23.000000Z",
          updated_at: "2024-09-19T09:21:23.000000Z",
        },
        {
          id: 2,
          name: "\u041f\u0440\u043e\u0434\u0432\u0438\u043d\u0443\u0442\u044b\u0439",
          image: "/storage/levels/advanced.png",
          from_level: 5,
          created_at: "2024-09-19T09:21:23.000000Z",
          updated_at: "2024-09-19T09:21:23.000000Z",
        },
        {
          id: 3,
          name: "\u041f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u043e\u043d\u0430\u043b",
          image: "/storage/levels/professional.png",
          from_level: 15,
          created_at: "2024-09-19T09:21:23.000000Z",
          updated_at: "2024-09-19T09:21:23.000000Z",
        },
        {
          id: 4,
          name: "\u042d\u043a\u0441\u043f\u0435\u0440\u0442",
          image: "/storage/levels/expert.png",
          from_level: 25,
          created_at: "2024-09-19T09:21:23.000000Z",
          updated_at: "2024-09-19T09:21:23.000000Z",
        },
        {
          id: 5,
          name: "\u0413\u0440\u0430\u043d\u0434\u043c\u0430\u0441\u0442\u0435\u0440",
          image: "/storage/levels/grandmaster.png",
          from_level: 33,
          created_at: "2024-09-19T09:21:23.000000Z",
          updated_at: "2024-09-19T09:21:23.000000Z",
        },
      ],
      level: {
        id: 1,
        name: "\u041d\u043e\u0432\u0438\u0447\u043e\u043a",
        image: "/storage/levels/beginner.png",
        from_level: 1,
        created_at: "2024-09-19T09:21:23.000000Z",
        updated_at: "2024-09-19T09:21:23.000000Z",
      },
      level_number: 1,
      level_progress: 50,
      achievements_org_count: 10,
      achievements_all_count: 42,
      rating: [
        {
          name: "\u0422\u0435\u0441\u0442\u043e\u0432\u0430\u044f \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u044f",
          score: 8140,
        },
        {
          name: "dgg",
          score: 6500,
        },
        {
          name: "\u0428\u0432\u0435\u0439\u043d\u0430\u044f \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u044f",
          score: 4700,
        },
        {
          name: "#SELFIEWORK",
          score: 4150,
        },
      ],
    },
    bonuses: [
      {
          id: 2,
          name: "\u0417\u0430\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u0435 \u043f\u0440\u043e\u0444\u0438\u043b\u044f",
          code: "profile_customer",
          sort: 200,
          amount: 700,
          role: "customer",
          active: 1,
          hidden: 0,
          link_path: "\/reg_wizard\/step2",
          link_title: "\u0417\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u044c \u043f\u0440\u043e\u0444\u0438\u043b\u044c",
          link_type: "get",
          created_at: "2024-09-19T09:21:18.000000Z",
          updated_at: "2024-09-19T09:21:18.000000Z",
          relationable_max_count: 1
      },
      {
          id: 4,
          name: "\u0414\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u0437\u0430\u043a\u0430\u0437\u0430",
          code: "order",
          sort: 400,
          amount: 200,
          role: "customer",
          active: 1,
          hidden: 0,
          link_path: "\/orders\/create",
          link_title: "\u0420\u0430\u0437\u043c\u0435\u0441\u0442\u0438\u0442\u044c \u0437\u0430\u043a\u0430\u0437",
          link_type: "get",
          created_at: "2024-09-19T09:21:18.000000Z",
          updated_at: "2024-09-19T09:21:18.000000Z",
          relationable_max_count: 1
      },
      {
          id: 5,
          name: "\u041f\u0440\u043e\u0432\u0435\u0440\u043a\u0430 \u043a\u043e\u043d\u0442\u0440\u0430\u0433\u0435\u043d\u0442\u0430",
          code: "org_check",
          sort: 500,
          amount: 40,
          role: null,
          active: 1,
          hidden: 0,
          link_path: "\/catalogue",
          link_title: "\u041f\u0440\u043e\u0432\u0435\u0440\u0438\u0442\u044c \u043a\u043e\u043d\u0442\u0440\u0430\u0433\u0435\u043d\u0442\u0430",
          link_type: "get",
          created_at: "2024-09-19T09:21:18.000000Z",
          updated_at: "2024-09-20T10:45:39.000000Z",
          relationable_max_count: 0
      },
      {
          id: 6,
          name: "\u041e\u0431\u0449\u0435\u043d\u0438\u0435",
          code: "chat",
          sort: 600,
          amount: 50,
          role: null,
          active: 1,
          hidden: 0,
          link_path: "\/catalogue",
          link_title: "\u0418\u043d\u0438\u0446\u0438\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0434\u0438\u0430\u043b\u043e\u0433",
          link_type: "get",
          created_at: "2024-09-19T09:21:18.000000Z",
          updated_at: "2024-09-20T10:45:39.000000Z",
          relationable_max_count: 1
      },
      {
          id: 7,
          name: "\u041f\u0440\u043e\u0432\u0435\u0434\u0435\u043d\u0438\u0435 \u0431\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u043e\u0439 \u0441\u0434\u0435\u043b\u043a\u0438",
          code: "deal",
          sort: 700,
          amount: 1000,
          role: null,
          active: 1,
          hidden: 0,
          link_path: "\/catalogue",
          link_title: "\u041f\u0440\u043e\u0432\u0435\u0441\u0442\u0438 \u0431\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u0443\u044e \u0441\u0434\u0435\u043b\u043a\u0443",
          link_type: "get",
          created_at: "2024-09-19T09:21:18.000000Z",
          updated_at: "2024-09-20T10:45:39.000000Z",
          relationable_max_count: 1
      },
      {
          id: 8,
          name: "\u041d\u0430\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u043e\u0442\u0437\u044b\u0432\u0430",
          code: "review",
          sort: 800,
          amount: 300,
          role: null,
          active: 1,
          hidden: 0,
          link_path: "\/chat",
          link_title: "\u041d\u0430\u043f\u0438\u0441\u0430\u0442\u044c \u043e\u0442\u0437\u044b\u0432",
          link_type: "get",
          created_at: "2024-09-19T09:21:18.000000Z",
          updated_at: "2024-09-20T10:45:39.000000Z",
          relationable_max_count: 1
      },
      {
          id: 9,
          name: "\u0410\u043a\u0442\u0438\u0432\u043d\u043e\u0441\u0442\u044c \u043d\u0430 \u0441\u0430\u0439\u0442\u0435",
          code: "activity",
          sort: 900,
          amount: 20,
          role: null,
          active: 1,
          hidden: 0,
          link_path: null,
          link_title: null,
          link_type: null,
          created_at: "2024-09-19T09:21:18.000000Z",
          updated_at: "2024-09-19T09:21:18.000000Z",
          relationable_max_count: 0
      },
      {
          id: 10,
          name: "\u0423\u0447\u0430\u0441\u0442\u0438\u0435 \u0432 \u0444\u043e\u043a\u0443\u0441-\u0433\u0440\u0443\u043f\u043f\u0435",
          code: "focus-group",
          sort: 1000,
          amount: 1000,
          role: null,
          active: 1,
          hidden: 0,
          link_path: null,
          link_title: "\u0423\u0447\u0430\u0441\u0442\u0432\u043e\u0432\u0430\u0442\u044c \u0432 \u0444\u043e\u043a\u0443\u0441-\u0433\u0440\u0443\u043f\u043f\u0435",
          link_type: null,
          created_at: "2024-09-19T09:21:18.000000Z",
          updated_at: "2024-09-20T10:45:39.000000Z",
          relationable_max_count: 1
      },
      {
          id: 11,
          name: "\u041e\u0442\u0432\u0435\u0442\u044b \u043d\u0430 \u043e\u043f\u0440\u043e\u0441\u044b",
          code: "poll",
          sort: 1100,
          amount: 300,
          role: null,
          active: 1,
          hidden: 0,
          link_path: null,
          link_title: "\u041e\u0442\u0432\u0435\u0442\u0438\u0442\u044c \u043d\u0430 \u043e\u043f\u0440\u043e\u0441",
          link_type: null,
          created_at: "2024-09-19T09:21:18.000000Z",
          updated_at: "2024-09-19T09:21:18.000000Z",
          relationable_max_count: 1
      },
    ],
    achievements: {
        current_page: 1,
        data: [
            {
                id: 1,
                hidden: 0,
                sort: 103,
                bonus_id: 2,
                name: "\u0418\u0434\u0435\u0430\u043b\u044c\u043d\u044b\u0439 \u043f\u0440\u043e\u0444\u0438\u043b\u044c",
                description: "\u0417\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u0435 \u043f\u0440\u043e\u0444\u0438\u043b\u044c \u0437\u0430\u043a\u0430\u0437\u0447\u0438\u043a\u0430 \u043d\u0430 100%",
                image: "/storage/achievements/profile.png",
                role: "customer",
                threshold: 1,
                created_at: "2024-09-19T09:21:18.000000Z",
                updated_at: "2024-09-19T09:21:18.000000Z",
                completed: null,
                progress: null
            },
            {
                id: 3,
                hidden: 0,
                sort: 105,
                bonus_id: 4,
                name: "\u041f\u0435\u0440\u0432\u044b\u0439 \u0428\u0430\u0433",
                description: "\u0420\u0430\u0437\u043c\u0435\u0441\u0442\u0438\u0442\u0435 \u0441\u0432\u043e\u0439 \u043f\u0435\u0440\u0432\u044b\u0439 \u0437\u0430\u043a\u0430\u0437",
                image: "/storage/achievements/order-1.png",
                role: "customer",
                threshold: 1,
                created_at: "2024-09-19T09:21:18.000000Z",
                updated_at: "2024-09-19T09:21:18.000000Z",
                completed: 1,
                progress: 1
            },
            {
                id: 8,
                hidden: 0,
                sort: 106,
                bonus_id: 5,
                name: "\u0414\u043e\u0432\u0435\u0440\u044f\u0439 \u0434\u0430 \u043f\u0440\u043e\u0432\u0435\u0440\u044f\u0439",
                description: "\u041f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u0441\u0432\u043e\u0435\u0433\u043e \u043f\u0435\u0440\u0432\u043e\u0433\u043e \u043a\u043e\u043d\u0442\u0440\u0430\u0433\u0435\u043d\u0442\u0430",
                image: "/storage/achievements/check-1.png",
                role: null,
                threshold: 1,
                created_at: "2024-09-19T09:21:18.000000Z",
                updated_at: "2024-09-19T09:21:18.000000Z",
                completed: 1,
                progress: 2
            },
            {
                id: 13,
                hidden: 0,
                sort: 107,
                bonus_id: 6,
                name: "\u0412 \u043d\u0430\u0447\u0430\u043b\u0435 \u0431\u044b\u043b\u043e \u0441\u043b\u043e\u0432\u043e",
                description: "\u041d\u0430\u0447\u043d\u0438\u0442\u0435 \u0441\u0432\u043e\u0435 \u043f\u0435\u0440\u0432\u043e\u0435 \u043e\u0431\u0449\u0435\u043d\u0438\u0435",
                image: "/storage/achievements/chat-1.png",
                role: null,
                threshold: 1,
                created_at: "2024-09-19T09:21:18.000000Z",
                updated_at: "2024-09-19T09:21:18.000000Z",
                completed: 1,
                progress: 5
            },
            {
                id: 18,
                hidden: 0,
                sort: 108,
                bonus_id: 7,
                name: "\u041d\u0430\u0447\u0438\u043d\u0430\u044e\u0449\u0438\u0439 \u0437\u0430\u0449\u0438\u0442\u043d\u0438\u043a",
                description: "\u041f\u0440\u043e\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u0432\u043e\u044e \u043f\u0435\u0440\u0432\u0443\u044e \u0431\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u0443\u044e \u0441\u0434\u0435\u043b\u043a\u0443",
                image: "/storage/achievements/deal-1.png",
                role: null,
                threshold: 1,
                created_at: "2024-09-19T09:21:18.000000Z",
                updated_at: "2024-09-19T09:21:18.000000Z",
                completed: null,
                progress: null
            }
        ],
        first_page_url: "https://test.bee-online.ru/achievements?page=1",
        from: 1,
        last_page: 9,
        last_page_url: "https://test.bee-online.ru/achievements?page=9",
        links: [
            {
                url: null,
                label: "&laquo; Previous",
                active: false
            },
            {
                url: "https://test.bee-online.ru/achievements?page=1",
                label: "1",
                active: true
            },
            {
                url: "https://test.bee-online.ru/achievements?page=2",
                label: "2",
                active: false
            },
            {
                url: "https://test.bee-online.ru/achievements?page=3",
                label: "3",
                active: false
            },
            {
                url: "https://test.bee-online.ru/achievements?page=4",
                label: "4",
                active: false
            },
            {
                url: "https://test.bee-online.ru/achievements?page=5",
                label: "5",
                active: false
            },
            {
                url: "https://test.bee-online.ru/achievements?page=6",
                label: "6",
                active: false
            },
            {
                url: "https://test.bee-online.ru/achievements?page=7",
                label: "7",
                active: false
            },
            {
                url: "https://test.bee-online.ru/achievements?page=8",
                label: "8",
                active: false
            },
            {
                url: "https://test.bee-online.ru/achievements?page=9",
                label: "9",
                active: false
            },
            {
                url: "https://test.bee-online.ru/achievements?page=2",
                label: "Next &raquo;",
                active: false
            }
        ],
        next_page_url: "https://test.bee-online.ru/achievements?page=2",
        path: "https://test.bee-online.ru/achievements",
        per_page: 5,
        prev_page_url: null,
        to: 5,
        total: 42
    },
    transactions: {
        current_page: 1,
        data: [
            {
                id: 4314,
                organization_id: 1,
                bonus_id: 9,
                amount: 20,
                type: "add",
                comment: null,
                created_at: "2024-11-18T05:12:44.000000Z",
                updated_at: "2024-11-18T05:12:44.000000Z",
                transaction_id: 4337,
                relationable_type: null,
                relationable_id: null,
                bonus: {
                    id: 9,
                    name: "\u0410\u043a\u0442\u0438\u0432\u043d\u043e\u0441\u0442\u044c \u043d\u0430 \u0441\u0430\u0439\u0442\u0435"
                }
            },
            {
                id: 4312,
                organization_id: 1,
                bonus_id: 9,
                amount: 20,
                type: "add",
                comment: null,
                created_at: "2024-11-15T05:12:42.000000Z",
                updated_at: "2024-11-15T05:12:42.000000Z",
                transaction_id: 4334,
                relationable_type: null,
                relationable_id: null,
                bonus: {
                    id: 9,
                    name: "\u0410\u043a\u0442\u0438\u0432\u043d\u043e\u0441\u0442\u044c \u043d\u0430 \u0441\u0430\u0439\u0442\u0435"
                }
            },
            {
                id: 4311,
                organization_id: 1,
                bonus_id: 8,
                amount: 300,
                type: "add",
                comment: null,
                created_at: "2024-11-14T12:15:03.000000Z",
                updated_at: "2024-11-14T12:15:03.000000Z",
                transaction_id: 4333,
                relationable_type: "App\\Models\\Review",
                relationable_id: 23,
                bonus: {
                    id: 8,
                    name: "\u041d\u0430\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u043e\u0442\u0437\u044b\u0432\u0430"
                }
            },
            {
                id: 4309,
                organization_id: 1,
                bonus_id: 6,
                amount: 50,
                type: "add",
                comment: null,
                created_at: "2024-11-14T06:29:16.000000Z",
                updated_at: "2024-11-14T06:29:16.000000Z",
                transaction_id: 4331,
                relationable_type: "App\\Models\\Chat",
                relationable_id: 3577,
                bonus: {
                    id: 6,
                    name: "\u041e\u0431\u0449\u0435\u043d\u0438\u0435"
                }
            },
            {
                id: 4307,
                organization_id: 1,
                bonus_id: 9,
                amount: 20,
                type: "add",
                comment: null,
                created_at: "2024-11-14T05:07:45.000000Z",
                updated_at: "2024-11-14T05:07:45.000000Z",
                transaction_id: 4329,
                relationable_type: null,
                relationable_id: null,
                bonus: {
                    id: 9,
                    name: "\u0410\u043a\u0442\u0438\u0432\u043d\u043e\u0441\u0442\u044c \u043d\u0430 \u0441\u0430\u0439\u0442\u0435"
                }
            },
            {
                id: 4305,
                organization_id: 1,
                bonus_id: 6,
                amount: 50,
                type: "add",
                comment: null,
                created_at: "2024-11-13T19:31:46.000000Z",
                updated_at: "2024-11-13T19:31:46.000000Z",
                transaction_id: 4327,
                relationable_type: "App\\Models\\Chat",
                relationable_id: 3576,
                bonus: {
                    id: 6,
                    name: "\u041e\u0431\u0449\u0435\u043d\u0438\u0435"
                }
            },
            {
                id: 4304,
                organization_id: 1,
                bonus_id: 9,
                amount: 20,
                type: "add",
                comment: null,
                created_at: "2024-11-13T05:05:36.000000Z",
                updated_at: "2024-11-13T05:05:36.000000Z",
                transaction_id: 4326,
                relationable_type: null,
                relationable_id: null,
                bonus: {
                    id: 9,
                    name: "\u0410\u043a\u0442\u0438\u0432\u043d\u043e\u0441\u0442\u044c \u043d\u0430 \u0441\u0430\u0439\u0442\u0435"
                }
            },
            {
                id: 4303,
                organization_id: 1,
                bonus_id: 9,
                amount: 20,
                type: "add",
                comment: null,
                created_at: "2024-11-11T05:08:06.000000Z",
                updated_at: "2024-11-11T05:08:06.000000Z",
                transaction_id: 4325,
                relationable_type: null,
                relationable_id: null,
                bonus: {
                    id: 9,
                    name: "\u0410\u043a\u0442\u0438\u0432\u043d\u043e\u0441\u0442\u044c \u043d\u0430 \u0441\u0430\u0439\u0442\u0435"
                }
            },
            {
                id: 4302,
                organization_id: 1,
                bonus_id: 9,
                amount: 20,
                type: "add",
                comment: null,
                created_at: "2024-11-08T12:07:42.000000Z",
                updated_at: "2024-11-08T12:07:42.000000Z",
                transaction_id: 4324,
                relationable_type: null,
                relationable_id: null,
                bonus: {
                    id: 9,
                    name: "\u0410\u043a\u0442\u0438\u0432\u043d\u043e\u0441\u0442\u044c \u043d\u0430 \u0441\u0430\u0439\u0442\u0435"
                }
            },
            {
                id: 4301,
                organization_id: 1,
                bonus_id: 9,
                amount: 20,
                type: "add",
                comment: null,
                created_at: "2024-11-07T09:46:32.000000Z",
                updated_at: "2024-11-07T09:46:32.000000Z",
                transaction_id: 4323,
                relationable_type: null,
                relationable_id: null,
                bonus: {
                    id: 9,
                    name: "\u0410\u043a\u0442\u0438\u0432\u043d\u043e\u0441\u0442\u044c \u043d\u0430 \u0441\u0430\u0439\u0442\u0435"
                }
            }
        ],
        first_page_url: "https:\/\/test.bee-online.ru\/bonus\/transactions?page=1",
        from: 1,
        last_page: 5,
        last_page_url: "https:\/\/test.bee-online.ru\/bonus\/transactions?page=5",
        links: [
            {
                url: null,
                label: "&laquo; Previous",
                active: false
            },
            {
                url: "https:\/\/test.bee-online.ru\/bonus\/transactions?page=1",
                label: "1",
                active: true
            },
            {
                url: "https:\/\/test.bee-online.ru\/bonus\/transactions?page=2",
                label: "2",
                active: false
            },
            {
                url: "https:\/\/test.bee-online.ru\/bonus\/transactions?page=3",
                label: "3",
                active: false
            },
            {
                url: "https:\/\/test.bee-online.ru\/bonus\/transactions?page=4",
                label: "4",
                active: false
            },
            {
                url: "https:\/\/test.bee-online.ru\/bonus\/transactions?page=5",
                label: "5",
                active: false
            },
            {
                url: "https:\/\/test.bee-online.ru\/bonus\/transactions?page=2",
                label: "Next &raquo;",
                active: false
            }
        ],
        next_page_url: "https:\/\/test.bee-online.ru\/bonus\/transactions?page=2",
        path: "https:\/\/test.bee-online.ru\/bonus\/transactions",
        per_page: 10,
        prev_page_url: null,
        to: 10,
        total: 49
    }
  }),
  actions: {},
});