export const analyzeComments = async (url) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                sentiment: {
                    positive: 62,
                    negative: 14,
                    neutral: 24,
                },
                userIntent: {
                    questions: 15,
                    praise: 45,
                    complaints: 10,
                    spam: 5,
                    discussion: 25
                },
                engagement: {
                    fan: 40,
                    casual: 35,
                    hries: 15, // "High-risk, High-reward" or simply "Debate"
                    churn: 10
                },
                toxicity: {
                    score: 92, // Safety score
                    breakdown: {
                        insult: 2,
                        threat: 0,
                        profanity: 5,
                        identityAttack: 1,
                        safe: 92
                    }
                },
                totalComments: 12453,
                topPositive: [
                    "This video changed my life, thank you!",
                    "Great explanation of the core concepts.",
                    "Love the editing style on this one.",
                    "Finally someone explained this clearly.",
                    "Subscribed immediately after watching."
                ],
                topNegative: [
                    "The audio quality is terrible.",
                    "Too long, didn't watch.",
                    "I disagree with the second point completely.",
                    "Clickbait title.",
                    "Why is the camera out of focus?"
                ],
                summary: {
                    short: "The audience reaction is overwhelmingly positive, with high praise for content clarity and editing. A small segment is concerned about audio quality.",
                    detailed: "The sentiment analysis indicates a strong positive reception (62%), driven largely by the video's clear educational value and high-quality editing. Viewers particularly appreciated the deep dive into core concepts, which many found life-changing.\n\nHowever, a notable 14% of comments expressed dissatisfaction, primarily focusing on technical issues. The recurring theme in negative feedback is poor audio quality, which seems to distract from the otherwise excellent content. Some users also felt the title was slightly misleading.\n\nEngagement metrics suggest a healthy community, with 40% of commenters classified as 'Fans' and 25% actively discussing the topic among themselves. The toxicity level is low, making this a safe environment for advertisers, though a minor 5% of comments contained profanity."
                },
                aiReplies: [
                    { id: 1, user: "JohnDoe", text: "Great video! How do I implement this in Python?", reply: "Thanks John! The concepts are similar in Python. You can use libraries like Pandas for the data part and Flask for the web server.", isPremium: false },
                    { id: 2, user: "SarahSmith", text: "Audio is bad at 2:00", reply: "Appreciate the feedback Sarah. We had a mic issue there, working on fixing it for the next one!", isPremium: false },
                    { id: 3, user: "DevKing", text: "Is this better than the old method?", reply: "It depends on your use case, DevKing. This method is faster for small datasets, but the old one scales better.", isPremium: false },
                    { id: 4, user: "TrollUser", text: "You suck", reply: null, isPremium: false }, // Should filter out
                    { id: 5, user: "EnterpriseUser", text: "Can we use this for enterprise scale apps?", reply: "Absolutely. For enterprise scale, I'd recommend looking into the Pro version of the library which handles load balancing automatically.", isPremium: true },
                    { id: 6, user: "SponsorLead", text: "dm for collab", reply: "Hi! Please reach out to our business email listed in the channel description.", isPremium: true }
                ]
            });
        }, 1500); // Simulate network delay
    });
};
