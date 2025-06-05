export const conversation = {
    introduction: {
        role: "assistant",
        content: [
            "Hi there! I’m AUZ, your communication guide. This is a short speaking session to help you become more confident and clear in your conversations.",
            "We’ll go through a few open questions. Just relax and speak naturally — there's no right or wrong answer.",
            "Let’s begin!",
        ],
        audio:"01-Ai-Introduction.mp3"
    },
    communication: [
        {
            role: "assistant",
            content: [
                "First, tell me a little bit about yourself — your name, what you do, and your goals for improving communication."
            ],
            audio:"02-Ai-Q1-warmup-smalltalk.mp3"
        },
        {
            role: "user",
            content: [
                "Hi, I’m Fatima. I work in sales at a design agency. I want to become more fluent and sound confident while talking to clients."
            ],
            assessment: "Clarity, fluency, natural introduction",
            audio:"03-Human-ans1-Introduction.mp3"
        },
        {
            role: "assistant",
            content: [
                "Great! Now I’d like you to tell me a short story or experience — anything memorable. For example, your favorite trip, a challenge you faced, or something funny that happened."
            ],
            audio:"04-Ai-Q2-storytelling.mp3"
        },
        {
            role: "user",
            content: [
                "Last year, I went to Turkey, and... um, it was amazing. I mean, the food, the culture — it was, like, so different. We almost missed our flight back, which was kind of crazy."
            ],
            assessment: "Narrative structure, filler words, natural pauses",
            audio:"05-Human-ans2-storytelling.mp3"
        },
        {
            role: "assistant",
            content: [
                "Now imagine you’re trying to sell a product or service. Pick something you know well — a phone, an app, a course. Try to explain its value and convince me to buy it."
            ],
            audio:"06-Ai-Q3-salessimulation.mp3"
        },
        {
            role: "user",
            content: [
                "Okay, I’d like to tell you about this productivity app. It helps you manage your time, set goals, and track habits. If you’re someone who struggles with focus, this app is a must-have."
            ],
            assessment: "Persuasive language, confidence, pacing, tone",
            audio:"07-Human-ans3-salesSimulation.mp3"
        },
        {
            role: "assistant",
            content: [
                "Nice pitch! Now let’s make it more real — I’m a customer who says: 'I don’t think I need this.' Try to respond to that."
            ],
            audio:"08-Ai-Q4-handleObjection.mp3"
        },
        {
            role: "user",
            content: [
                "I understand that — a lot of people feel that way. But once they try it, they see how much it helps with structure. Maybe I can offer you a free trial?"
            ],
            assessment: "Objection handling, thinking on feet, empathy",
            audio:"09-Human-ans4-handleObjection.mp3"
        },
        {
            role: "assistant",
            content: [
                "Lastly, feel free to say anything else — a thought, an opinion, or a question you wish people asked you more often."
            ],
            audio:"10-Ai-Q5-freeTalk.mp3"
        },
        {
            role: "user",
            content: [
                "I think more people should ask others what makes them feel confident. For me, it’s being prepared and knowing my topic well."
            ],
            assessment: "Freestyle confidence, initiative, personality",
            audio:"11-Human-ans5-freeTalk.mp3"
        },
    ],
    wrapup: {
        role: "assistant",
        content: [
            "I had fun talking to you, that was great! - Thank you so much for sharing with me. Please give me a moment to analyze and prepare feedback for you. Please bear with me, my insides are a bit slow today!"
        ],
        audio:"12-AI-Wrap-Up.mp3"
    }
}