
interface Question {
  text: string;
  type: string;
  hint?: string;
}

interface CategoryData {
  title: string;
  questions: Question[];
}

export const gameData: Record<string, CategoryData> = {
  conversation: {
    title: "Deep Talk",
    questions: [
      {
        text: "What's one dream you've never told anyone about?",
        type: "Deep Question",
        hint: "Be vulnerable and share something meaningful"
      },
      {
        text: "If you could relive one day from your past, which would it be and why?",
        type: "Memory Lane"
      },
      {
        text: "What's something about me that surprised you when we first met?",
        type: "First Impressions"
      },
      {
        text: "What's your biggest fear about our future together?",
        type: "Vulnerability",
        hint: "This is a safe space to share your concerns"
      },
      {
        text: "What's one thing I do that makes you feel most loved?",
        type: "Love Language"
      },
      {
        text: "If we could travel anywhere together right now, where would you want to go?",
        type: "Dreams & Goals"
      },
      {
        text: "What's something you've always wanted to learn together?",
        type: "Shared Growth"
      },
      {
        text: "What's your favorite memory of us so far?",
        type: "Cherished Moments"
      }
    ]
  },
  romantic: {
    title: "Romance",
    questions: [
      {
        text: "Tell me three things you love about my smile",
        type: "Sweet Compliments"
      },
      {
        text: "What's the most romantic thing we could do this weekend?",
        type: "Date Ideas"
      },
      {
        text: "Describe how you felt the first time we kissed",
        type: "Romantic Memory"
      },
      {
        text: "What's your favorite way for me to show you affection?",
        type: "Love Preferences"
      },
      {
        text: "If you could plan the perfect romantic evening for us, what would it include?",
        type: "Dream Date"
      },
      {
        text: "What song reminds you of us and why?",
        type: "Musical Connection"
      },
      {
        text: "What's something romantic you've always wanted to try together?",
        type: "Romantic Bucket List"
      },
      {
        text: "Tell me about a moment when you knew you were falling for me",
        type: "Falling in Love"
      }
    ]
  },
  playful: {
    title: "Playful Fun",
    questions: [
      {
        text: "Do your best impression of me when I wake up in the morning",
        type: "Silly Challenge",
        hint: "Have fun with this one!"
      },
      {
        text: "What's the most embarrassing thing that's happened to you this week?",
        type: "Funny Stories"
      },
      {
        text: "If we were in a movie together, what genre would it be and why?",
        type: "Imagination Game"
      },
      {
        text: "Give each other a silly nickname and explain why you chose it",
        type: "Name Game"
      },
      {
        text: "What's your weirdest habit that I don't know about?",
        type: "Quirky Confessions"
      },
      {
        text: "If you could have any superpower for a day, what would you do?",
        type: "Fantasy Fun"
      },
      {
        text: "What's the strangest food combination you actually enjoy?",
        type: "Weird Preferences"
      },
      {
        text: "Tell me a joke that always makes you laugh",
        type: "Comedy Hour"
      }
    ]
  },
  intimate: {
    title: "Intimate Connection",
    questions: [
      {
        text: "What makes you feel most connected to me?",
        type: "Emotional Intimacy"
      },
      {
        text: "How do you like to be touched when you're feeling stressed?",
        type: "Physical Comfort"
      },
      {
        text: "What's something you find irresistibly attractive about me?",
        type: "Attraction"
      },
      {
        text: "When do you feel most beautiful/handsome with me?",
        type: "Confidence Boost"
      },
      {
        text: "What's your favorite way to be close together?",
        type: "Intimacy Preferences"
      },
      {
        text: "How can I make you feel more desired?",
        type: "Desire & Passion"
      },
      {
        text: "What's a fantasy you'd like to explore together?",
        type: "Shared Fantasies",
        hint: "Keep it respectful and consensual"
      },
      {
        text: "What makes you feel most comfortable being vulnerable with me?",
        type: "Emotional Safety"
      }
    ]
  },
  adventure: {
    title: "Adventure Together",
    questions: [
      {
        text: "Plan a spontaneous adventure we could go on right now",
        type: "Spontaneous Challenge"
      },
      {
        text: "What's the most adventurous thing you want to try with me?",
        type: "Bucket List"
      },
      {
        text: "If we had unlimited money, what crazy adventure would we go on?",
        type: "Dream Adventure"
      },
      {
        text: "What's something that scares you that you'd want me to help you overcome?",
        type: "Courage Building"
      },
      {
        text: "Let's plan a mystery date for each other - give three clues about what you'd plan",
        type: "Mystery Planning"
      },
      {
        text: "What skill would you want us to learn together?",
        type: "Learning Adventure"
      },
      {
        text: "If we could live anywhere in the world for a year, where would it be?",
        type: "Life Adventure"
      },
      {
        text: "What's the most exciting thing we could do to step out of our comfort zone?",
        type: "Comfort Zone Challenge"
      }
    ]
  },
  "couple-goals": {
    title: "Couple Goals",
    questions: [
      {
        text: "What does our perfect life together look like in 5 years?",
        type: "Future Vision"
      },
      {
        text: "What tradition do you want us to start together?",
        type: "Creating Traditions"
      },
      {
        text: "How do you want us to handle disagreements in the future?",
        type: "Relationship Goals"
      },
      {
        text: "What's one goal you want us to achieve together this year?",
        type: "Shared Goals"
      },
      {
        text: "How do you want to celebrate our relationship milestones?",
        type: "Celebration Planning"
      },
      {
        text: "What kind of couple do you want us to be known as?",
        type: "Relationship Identity"
      },
      {
        text: "What's something we could do to make our relationship even stronger?",
        type: "Growth Goals"
      },
      {
        text: "How do you want us to support each other's individual dreams?",
        type: "Mutual Support"
      }
    ]
  }
};
