
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi' | 'te' | 'ta' | 'mr';

const translations = {
  en: {
    nav: {
      about: 'About',
      contact: 'Contact',
      language: 'Language',
      joinAsMentor: 'Join as a Mentor',
      signIn: 'Sign In',
      signOut: 'Sign Out',
    },
    home: {
        hero: {
            title: 'Find Your Perfect Mentor',
            subtitle: 'Use the power of AI to connect with mentors who can help you achieve your goals. Describe what you want to learn, and we\'ll find the right match for you.'
        },
        features: {
            gupshup: {
                title: 'Gupshup Gurukul',
                subtitle: 'Peer voice groups for learning and motivation',
                description: 'Connect with fellow learners in voice-based groups. Share your progress, ask questions, and stay motivated together on your journey.',
                button: 'Join a Group'
            },
            whisper: {
                title: 'WhisperAsk',
                subtitle: 'Ask questions anonymously',
                description: 'Have a question you\'re hesitant to ask? Use WhisperAsk to get answers from mentors anonymously and confidentially.',
                button: 'Ask a Question'
            },
            shruti: {
                title: 'Shruti Mode',
                subtitle: 'Works offline via downloaded audio',
                description: 'Access your learning materials anytime, anywhere, even without an internet connection. Download audio content and continue your progress offline.',
                button: 'Learn More'
            },
            gaatha: {
                title: 'Audio Badges + Gaatha',
                subtitle: 'Motivational progress stories in audio form',
                description: 'Earn badges as you learn and listen to inspiring stories from others who have achieved their goals. A unique way to track your progress and stay inspired.',
                button: 'Listen Now'
            }
        }
    },
    bolbuddy: {
      title: 'What are your goals?',
      description: 'Tell us what you want to achieve. You can type or use your voice.',
      form: {
        label: 'Your Goals',
        placeholder: 'e.g., \'I want to learn coding to get a job\' or \'I want to start my own business...\'',
        startRecording: 'Start recording',
        stopRecording: 'Stop recording',
        button: {
          default: 'Find My Mentor',
          loading: 'Matching...'
        }
      },
      loading: 'Finding the perfect mentor for you...',
      toast: {
        error: {
            title: 'Failed to find a mentor'
        }
      }
    },
    voice: {
        unsupported: {
            title: 'Unsupported Browser',
            description: 'Your browser does not support voice recording.'
        },
        error: {
            title: 'Voice Error',
            description: 'Could not recognize speech'
        }
    },
    joinMentor: {
        title: 'Become a Mentor',
        description: 'Share your knowledge and guide the next generation of talent. Fill out the form below to join us.',
        form: {
            name: { label: 'Full Name' },
            email: { label: 'Email Address' },
            expertise: { label: 'Expertise / Skills', placeholder: 'e.g., Python, UI/UX Design, Public Speaking' },
            bio: { label: 'Short Bio', placeholder: 'Tell us a little about yourself and your experience.' },
            button: {
                default: 'Apply to be a Mentor',
                loading: 'Submitting Application...'
            }
        },
        submitted: {
            title: 'Thank You!',
            description: 'Your application has been received. We will review it and get in touch with you shortly.'
        },
        toast: {
            title: 'Application Submitted!',
            description: 'Thank you for your interest in becoming a mentor.'
        }
    },
    errors: {
        "Name must be at least 2 characters.": "Name must be at least 2 characters.",
        "Please enter a valid email.": "Please enter a valid email.",
        "Please list your areas of expertise (at least 10 characters).": "Please list your areas of expertise (at least 10 characters).",
        "Bio must be at least 20 characters.": "Bio must be at least 20 characters.",
        "Name is required": "Name is required",
        "Please select a date": "Please select a date",
        "Please tell us a bit more about your goals (at least 10 characters).": "Please tell us a bit more about your goals (at least 10 characters).",
    },
    mentorCard: {
        about: 'About {{name}}',
        reason: 'Why we matched you',
        listen: 'Listen to Intro',
        generating: 'Generating...',
        connect: 'Connect',
        bookCall: 'Book a Voice Call'
    },
    mentorConnect: {
        greeting: 'Shabash! Aapka mentor ab aapke sath hai.',
        tabs: {
            voiceMessage: {
                title: 'Send Voice Message',
                description: 'Record a message for your mentor. Ask a question or share an update.',
                placeholder: 'Your recorded message will appear here...',
                button: 'Send Message'
            },
            bookCall: {
                title: 'Book Weekly Call',
                description: 'Schedule a one-on-one call with {{name}}.',
                form: {
                    name: { label: 'Your Name' },
                    date: { label: 'Preferred Date' },
                    notes: { label: 'Notes (Optional)', placeholder: 'Anything specific you want to discuss?' },
                    button: 'Book Call'
                }
            },
            lessons: {
                title: 'Audio Lessons',
                description: 'Listen to lessons from {{name}}.',
                lesson1: { title: 'Lesson 1: Introduction to {{expertise}}' },
                lesson2: { title: 'Lesson 2: Core Concepts' },
                offline: {
                    title: 'Offline Access',
                    description: 'Download lessons to listen anywhere, even without an internet connection.'
                }
            }
        },
        messageSent: {
            title: 'Message Sent!',
            description: 'Your voice message has been sent to your mentor.',
            alertDescription: 'Your mentor will receive your message and respond soon.'
        },
        callBooked: {
            title: 'Call Booked!',
            description: 'Your call with {{name}} has been scheduled.',
            alertTitle: 'Call Scheduled!',
            alertDescription: 'Your weekly call has been booked. You will receive a confirmation email shortly.'
        }
    }
  },
  hi: {
    nav: {
      language: 'भाषा',
      joinAsMentor: 'मेंटर के रूप में जुड़ें',
      signIn: 'साइन इन करें',
      signOut: 'साइन आउट',
    },
    home: {
        hero: {
            title: 'अपना आदर्श मेंटर ढूंढें',
            subtitle: 'अपने लक्ष्यों को प्राप्त करने में मदद करने वाले मेंटर्स से जुड़ने के लिए AI की शक्ति का उपयोग करें। बताएं कि आप क्या सीखना चाहते हैं, और हम आपके लिए सही मैच ढूंढेंगे।'
        },
        features: {
            gupshup: {
                title: 'गपशप गुरुकुल',
                subtitle: 'सीखने और प्रेरणा के लिए पीयर वॉयस ग्रुप',
                description: 'वॉयस-आधारित समूहों में साथी शिक्षार्थियों से जुड़ें। अपनी प्रगति साझा करें, प्रश्न पूछें, और अपनी यात्रा पर एक साथ प्रेरित रहें।',
                button: 'एक समूह में शामिल हों'
            },
            whisper: {
                title: 'व्हिस्परआस्क',
                subtitle: 'गुमनाम रूप से प्रश्न पूछें',
                description: 'कोई ऐसा प्रश्न है जिसे पूछने में आप झिझक रहे हैं? गुमनाम और गोपनीय रूप से मेंटर्स से उत्तर पाने के लिए व्हिस्परआस्क का उपयोग करें।',
                button: 'एक प्रश्न पूछें'
            },
            shruti: {
                title: 'श्रुति मोड',
                subtitle: 'डाउनलोड किए गए ऑडियो के माध्यम से ऑफ़लाइन काम करता है',
                description: 'बिना इंटरनेट कनेक्शन के भी, कहीं भी, कभी भी अपनी सीखने की सामग्री तक पहुँचें। ऑडियो सामग्री डाउनलोड करें और अपनी प्रगति ऑफ़लाइन जारी रखें।',
                button: ' और जानें'
            },
            gaatha: {
                title: 'ऑडियो बैज + गाथा',
                subtitle: 'ऑडियो रूप में प्रेरक प्रगति की कहानियाँ',
                description: 'जैसे-जैसे आप सीखते हैं, बैज अर्जित करें और अपने लक्ष्यों को प्राप्त करने वाले दूसरों की प्रेरक कहानियों को सुनें। अपनी प्रगति को ट्रैक करने और प्रेरित रहने का एक अनूठा तरीका।',
                button: 'अभी सुनें'
            }
        }
    },
    bolbuddy: {
      title: 'आपके लक्ष्य क्या हैं?',
      description: 'हमें बताएं कि आप क्या हासिल करना चाहते हैं। आप टाइप कर सकते हैं या अपनी आवाज का उपयोग कर सकते हैं।',
      form: {
        label: 'आपके लक्ष्य',
        placeholder: 'जैसे, \'मैं नौकरी पाने के लिए कोडिंग सीखना चाहता हूं\' या \'मैं अपना खुद का व्यवसाय शुरू करना चाहता हूं...\'',
        startRecording: 'रिकॉर्डिंग शुरू करें',
        stopRecording: 'रिकॉर्डिंग बंद करें',
        button: {
          default: 'मेरा मेंटर ढूंढें',
          loading: 'मैचिंग...'
        }
      },
      loading: 'आपके लिए सही मेंटर ढूंढ रहा है...',
       toast: {
        error: {
            title: 'मेंटर खोजने में विफल'
        }
      }
    },
    voice: {
        unsupported: {
            title: 'असमर्थित ब्राउज़र',
            description: 'आपका ब्राउज़र वॉयस रिकॉर्डिंग का समर्थन नहीं करता है।'
        },
        error: {
            title: 'आवाज त्रुटि',
            description: 'भाषण को पहचाना नहीं जा सका'
        }
    },
    joinMentor: {
        title: 'एक मेंटर बनें',
        description: 'अपने ज्ञान को साझा करें और अगली पीढ़ी की प्रतिभा का मार्गदर्शन करें। हमसे जुड़ने के लिए नीचे दिया गया फॉर्म भरें।',
        form: {
            name: { label: 'पूरा नाम' },
            email: { label: 'ईमेल पता' },
            expertise: { label: 'विशेषज्ञता / कौशल', placeholder: 'जैसे, पायथन, यूआई/यूएक्स डिजाइन, सार्वजनिक भाषण' },
            bio: { label: 'संक्षिप्त बायो', placeholder: 'हमें अपने और अपने अनुभव के बारे में थोड़ा बताएं।' },
            button: {
                default: 'मेंटर बनने के लिए आवेदन करें',
                loading: 'आवेदन जमा हो रहा है...'
            }
        },
        submitted: {
            title: 'धन्यवाद!',
            description: 'आपका आवेदन प्राप्त हो गया है। हम इसकी समीक्षा करेंगे और जल्द ही आपसे संपर्क करेंगे।'
        },
        toast: {
            title: 'आवेदन जमा किया गया!',
            description: 'एक मेंटर बनने में आपकी रुचि के लिए धन्यवाद।'
        }
    },
    errors: {
        "Name must be at least 2 characters.": "नाम कम से कम 2 अक्षरों का होना चाहिए।",
        "Please enter a valid email.": "कृपया एक वैध ईमेल दर्ज करें।",
        "Please list your areas of expertise (at least 10 characters).": "कृपया अपनी विशेषज्ञता के क्षेत्रों (कम से कम 10 अक्षर) को सूचीबद्ध करें।",
        "Bio must be at least 20 characters.": "बायो कम से कम 20 अक्षरों का होना चाहिए।",
        "Name is required": "नाम आवश्यक है",
        "Please select a date": "कृपया एक तारीख चुनें",
        "Please tell us a bit more about your goals (at least 10 characters).": "कृपया हमें अपने लक्ष्यों के बारे में थोड़ा और बताएं (कम से कम 10 अक्षर)।",
    },
    mentorCard: {
        about: '{{name}} के बारे में',
        reason: 'हमने आपको क्यों मैच किया',
        listen: 'परिचय सुनें',
        generating: 'उत्पन्न हो रहा है...',
        connect: 'जुड़ें',
        bookCall: 'वॉयस कॉल बुक करें'
    },
    mentorConnect: {
        greeting: 'शाबाश! आपका मेंटर अब आपके साथ है।',
        tabs: {
            voiceMessage: {
                title: 'वॉयस संदेश भेजें',
                description: 'अपने मेंटर के लिए एक संदेश रिकॉर्ड करें। एक प्रश्न पूछें या एक अपडेट साझा करें।',
                placeholder: 'आपका रिकॉर्ड किया गया संदेश यहां दिखाई देगा...',
                button: 'संदेश भेजें'
            },
            bookCall: {
                title: 'साप्ताहिक कॉल बुक करें',
                description: '{{name}} के साथ एक-एक कॉल शेड्यूल करें।',
                form: {
                    name: { label: 'आपका नाम' },
                    date: { label: 'पसंदीदा तारीख' },
                    notes: { label: 'नोट्स (वैकल्पिक)', placeholder: 'क्या आप कुछ विशेष चर्चा करना चाहते हैं?' },
                    button: 'कॉल बुक करें'
                }
            },
            lessons: {
                title: 'ऑडियो पाठ',
                description: '{{name}} से पाठ सुनें।',
                lesson1: { title: 'पाठ 1: {{expertise}} का परिचय' },
                lesson2: { title: 'पाठ 2: मुख्य अवधारणाएँ' },
                offline: {
                    title: 'ऑफ़लाइन पहुँच',
                    description: 'कहीं भी सुनने के लिए पाठ डाउनलोड करें, बिना इंटरनेट कनेक्शन के भी।'
                }
            }
        },
        messageSent: {
            title: 'संदेश भेजा गया!',
            description: 'आपका वॉयस संदेश आपके मेंटर को भेज दिया गया है।',
            alertDescription: 'आपका मेंटर आपका संदेश प्राप्त करेगा और जल्द ही जवाब देगा।'
        },
        callBooked: {
            title: 'कॉल बुक हो गई!',
            description: '{{name}} के साथ आपकी कॉल निर्धारित हो गई है।',
            alertTitle: 'कॉल निर्धारित!',
            alertDescription: 'आपकी साप्ताहिक कॉल बुक हो गई है। आपको शीघ्र ही एक पुष्टिकरण ईमेल प्राप्त होगा।'
        }
    }
  },
  te: {
    nav: {
      language: 'భాష',
      joinAsMentor: 'మార్గదర్శకుడిగా చేరండి',
      signIn: 'సైన్ ఇన్ చేయండి',
      signOut: 'సైన్ అవుట్ చేయండి',
    },
    home: {
      hero: {
        title: 'మీ ఖచ్చితమైన మార్గదర్శకుడిని కనుగొనండి',
        subtitle: 'మీ లక్ష్యాలను సాధించడంలో మీకు సహాయపడే మార్గదర్శకులతో కనెక్ట్ అవ్వడానికి AI శక్తిని ఉపయోగించండి. మీరు ఏమి నేర్చుకోవాలనుకుంటున్నారో వివరించండి మరియు మేము మీ కోసం సరైన సరిపోలికను కనుగొంటాము.'
      },
      features: {
        gupshup: {
          title: 'గప్‌షప్ గురుకుల్',
          subtitle: 'నేర్చుకోవడం మరియు ప్రేరణ కోసం పీర్ వాయిస్ గ్రూపులు',
          description: 'వాయిస్-ఆధారిత సమూహాలలో తోటి అభ్యాసకులతో కనెక్ట్ అవ్వండి. మీ పురోగతిని పంచుకోండి, ప్రశ్నలు అడగండి మరియు మీ ప్రయాణంలో కలిసి ప్రేరణ పొందండి.',
          button: 'ఒక సమూహంలో చేరండి'
        },
        whisper: {
          title: 'విష్పర్‌ఆస్క్',
          subtitle: 'అనామకంగా ప్రశ్నలు అడగండి',
          description: 'మీరు అడగడానికి సంకోచించే ప్రశ్న ఉందా? మార్గదర్శకుల నుండి అనామకంగా మరియు గోప్యంగా సమాధానాలు పొందడానికి విష్పర్‌ఆస్క్ ఉపయోగించండి.',
          button: 'ఒక ప్రశ్న అడగండి'
        },
        shruti: {
          title: 'శ్రుతి మోడ్',
          subtitle: 'డౌన్‌లోడ్ చేసిన ఆడియో ద్వారా ఆఫ్‌లైన్‌లో పనిచేస్తుంది',
          description: 'ఇంటర్నెట్ కనెక్షన్ లేకుండా కూడా, ఎప్పుడైనా, ఎక్కడైనా మీ అభ్యాస సామగ్రిని యాక్సెస్ చేయండి. ఆడియో కంటెంట్‌ను డౌన్‌లోడ్ చేయండి మరియు మీ పురోగతిని ఆఫ్‌లైన్‌లో కొనసాగించండి.',
          button: 'మరింత తెలుసుకోండి'
        },
        gaatha: {
          title: 'ఆడియో బ్యాడ్జ్‌లు + గాథ',
          subtitle: 'ఆడియో రూపంలో ప్రేరణాత్మక పురోగతి కథలు',
          description: 'మీరు నేర్చుకున్నప్పుడు బ్యాడ్జ్‌లను సంపాదించండి మరియు వారి లక్ష్యాలను సాధించిన ఇతరుల నుండి స్ఫూర్తిదాయకమైన కథలను వినండి. మీ పురోగతిని ట్రాక్ చేయడానికి మరియు ప్రేరణ పొందడానికి ఒక ప్రత్యేకమైన మార్గం.',
          button: 'ఇప్పుడు వినండి'
        }
      }
    },
    bolbuddy: {
      title: 'మీ లక్ష్యాలు ఏమిటి?',
      description: 'మీరు ఏమి సాధించాలనుకుంటున్నారో మాకు చెప్పండి. మీరు టైప్ చేయవచ్చు లేదా మీ వాయిస్‌ని ఉపయోగించవచ్చు.',
      form: {
        label: 'మీ లక్ష్యాలు',
        placeholder: 'ఉదా., \'నేను ఉద్యోగం పొందడానికి కోడింగ్ నేర్చుకోవాలనుకుంటున్నాను\' లేదా \'నేను నా స్వంత వ్యాపారాన్ని ప్రారంభించాలనుకుంటున్నాను...\'',
        startRecording: 'రికార్డింగ్ ప్రారంభించండి',
        stopRecording: 'రికార్డింగ్ ఆపండి',
        button: {
          default: 'నా మార్గదర్శకుడిని కనుగొనండి',
          loading: 'సరిపోలుతోంది...'
        }
      },
      loading: 'మీ కోసం సరైన మార్గదర్శకుడిని కనుగొనడం...',
      toast: {
        error: {
          title: 'మార్గదర్శకుడిని కనుగొనడంలో విఫలమైంది'
        }
      }
    },
    voice: {
      unsupported: {
        title: 'మద్దతు లేని బ్రౌజర్',
        description: 'మీ బ్రౌజర్ వాయిస్ రికార్డింగ్‌కు మద్దతు ఇవ్వదు.'
      },
      error: {
        title: 'వాయిస్ లోపం',
        description: 'ప్రసంగాన్ని గుర్తించలేకపోయింది'
      }
    },
    joinMentor: {
      title: 'మార్గదర్శకుడిగా అవ్వండి',
      description: 'మీ జ్ఞానాన్ని పంచుకోండి మరియు తదుపరి తరం ప్రతిభకు మార్గనిర్దేశం చేయండి. మాతో చేరడానికి దిగువ ఫారమ్‌ను పూరించండి.',
      form: {
        name: { label: 'పూర్తి పేరు' },
        email: { label: 'ఈమెయిలు చిరునామా' },
        expertise: { label: 'నైపుణ్యం / నైపుణ్యాలు', placeholder: 'ఉదా., పైథాన్, UI/UX డిజైన్, పబ్లిక్ స్పీకింగ్' },
        bio: { label: 'చిన్న బయో', placeholder: 'మీ గురించి మరియు మీ అనుభవం గురించి మాకు కొద్దిగా చెప్పండి.' },
        button: {
          default: 'మార్గదర్శకుడిగా దరఖాస్తు చేసుకోండి',
          loading: 'అప్లికేషన్ సమర్పిస్తోంది...'
        }
      },
      submitted: {
        title: 'ధన్యవాదాలు!',
        description: 'మీ దరఖాస్తు స్వీకరించబడింది. మేము దానిని సమీక్షించి, త్వరలో మిమ్మల్ని సంప్రదిస్తాము.'
      },
      toast: {
        title: 'దరఖాస్తు సమర్పించబడింది!',
        description: 'మార్గదర్శకుడిగా మారడానికి మీ ఆసక్తికి ధన్యవాదాలు.'
      }
    },
    errors: {
      "Name must be at least 2 characters.": "పేరు కనీసం 2 అక్షరాలు ఉండాలి.",
      "Please enter a valid email.": "దయచేసి చెల్లుబాటు అయ్యే ఇమెయిల్‌ను నమోదు చేయండి.",
      "Please list your areas of expertise (at least 10 characters).": "దయచేసి మీ నైపుణ్యం ఉన్న ప్రాంతాలను (కనీసం 10 అక్షరాలు) జాబితా చేయండి.",
      "Bio must be at least 20 characters.": "బయో కనీసం 20 అక్షరాలు ఉండాలి.",
      "Name is required": "పేరు అవసరం",
      "Please select a date": "దయచేసి ఒక తేదీని ఎంచుకోండి",
      "Please tell us a bit more about your goals (at least 10 characters).": "దయచేసి మీ లక్ష్యాల గురించి మాకు మరికొంత చెప్పండి (కనీసం 10 అక్షరాలు).",
    },
    mentorCard: {
      about: '{{name}} గురించి',
      reason: 'మేము మిమ్మల్ని ఎందుకు సరిపోల్చాము',
      listen: 'పరిచయం వినండి',
      generating: 'సృష్టిస్తోంది...',
      connect: 'కనెక్ట్ అవ్వండి',
      bookCall: 'వాయిస్ కాల్ బుక్ చేయండి'
    },
    mentorConnect: {
        greeting: ' شاباش! మీ గురువు ఇప్పుడు మీతో ఉన్నారు.',
        tabs: {
            voiceMessage: {
                title: 'వాయిస్ సందేశం పంపండి',
                description: 'మీ గురువు కోసం ఒక సందేశాన్ని రికార్డ్ చేయండి. ఒక ప్రశ్న అడగండి లేదా ఒక నవీకరణను పంచుకోండి.',
                placeholder: 'మీరు రికార్డ్ చేసిన సందేశం ఇక్కడ కనిపిస్తుంది...',
                button: 'సందేశం పంపండి'
            },
            bookCall: {
                title: 'వారపు కాల్ బుక్ చేయండి',
                description: '{{name}}తో ఒకరితో ఒకరు కాల్ షెడ్యూల్ చేయండి.',
                form: {
                    name: { label: 'మీ పేరు' },
                    date: { label: 'ప్రాధాన్య తేదీ' },
                    notes: { label: 'గమనికలు (ఐచ్ఛికం)', placeholder: 'మీరు చర్చించాలనుకుంటున్న నిర్దిష్ట విషయం ఏదైనా ఉందా?' },
                    button: 'కాల్ బుక్ చేయండి'
                }
            },
            lessons: {
                title: 'ఆడియో పాఠాలు',
                description: '{{name}} నుండి పాఠాలు వినండి.',
                lesson1: { title: 'పాఠం 1: {{expertise}} పరిచయం' },
                lesson2: { title: 'పాఠం 2: ప్రధాన భావనలు' },
                offline: {
                    title: 'ఆఫ్‌లైన్ యాక్సెస్',
                    description: 'ఇంటర్నెట్ కనెక్షన్ లేకుండా కూడా ఎక్కడైనా వినడానికి పాఠాలను డౌన్‌లోడ్ చేయండి.'
                }
            }
        },
        messageSent: {
            title: 'సందేశం పంపబడింది!',
            description: 'మీ వాయిస్ సందేశం మీ గురువుకు పంపబడింది.',
            alertDescription: 'మీ గురువు మీ సందేశాన్ని స్వీకరించి త్వరలో స్పందిస్తారు.'
        },
        callBooked: {
            title: 'కాల్ బుక్ చేయబడింది!',
            description: '{{name}}తో మీ కాల్ షెడ్యూల్ చేయబడింది.',
            alertTitle: 'కాల్ షెడ్యూల్ చేయబడింది!',
            alertDescription: 'మీ వారపు కాల్ బుక్ చేయబడింది. మీకు త్వరలో నిర్ధారణ ఇమెయిల్ వస్తుంది.'
        }
    }
  },
  ta: {
    nav: {
      language: 'மொழி',
      joinAsMentor: 'வழிகாட்டியாக சேரவும்',
      signIn: 'உள்நுழைக',
      signOut: 'வெளியேறு',
    },
    home: {
      hero: {
        title: 'உங்கள் சரியான வழிகாட்டியைக் கண்டறியுங்கள்',
        subtitle: 'உங்கள் இலக்குகளை அடைய உதவும் வழிகாட்டிகளுடன் இணைய AI இன் ஆற்றலைப் பயன்படுத்தவும். நீங்கள் கற்றுக்கொள்ள விரும்புவதை விவரிக்கவும், உங்களுக்கான சரியான பொருத்தத்தைக் கண்டறிவோம்.'
      },
      features: {
        gupshup: {
          title: 'கப்ஷப் गुरुकुल',
          subtitle: 'கற்றல் மற்றும் ஊக்கத்திற்கான சக குரல் குழுக்கள்',
          description: 'குரல் அடிப்படையிலான குழுக்களில் சக கற்பவர்களுடன் இணையுங்கள். உங்கள் முன்னேற்றத்தைப் பகிர்ந்து கொள்ளுங்கள், கேள்விகளைக் கேளுங்கள், உங்கள் பயணத்தில் ஒன்றாக ஊக்கத்துடன் இருங்கள்.',
          button: 'ஒரு குழுவில் சேரவும்'
        },
        whisper: {
          title: 'விஸ்பர்ஆஸ்க்',
          subtitle: 'அடையாளம் காட்டாமல் கேள்விகளைக் கேளுங்கள்',
          description: 'நீங்கள் கேட்கத் தயங்கும் கேள்வி உள்ளதா? வழிகாட்டிகளிடமிருந்து அநாமதேயமாகவும் ரகசியமாகவும் பதில்களைப் பெற விஸ்பர்ஆஸ்கைப் பயன்படுத்தவும்.',
          button: 'ஒரு கேள்வியைக் கேளுங்கள்'
        },
        shruti: {
          title: 'ஸ்ருதி பயன்முறை',
          subtitle: 'பதிவிறக்கம் செய்யப்பட்ட ஆடியோ மூலம் ஆஃப்லைனில் வேலை செய்கிறது',
          description: 'இணைய இணைப்பு இல்லாவிட்டாலும், எங்கும், எந்த நேரத்திலும் உங்கள் கற்றல் பொருட்களை அணுகவும். ஆடியோ உள்ளடக்கத்தைப் பதிவிறக்கி, உங்கள் முன்னேற்றத்தை ஆஃப்லைனில் தொடரவும்.',
          button: 'மேலும் அறிக'
        },
        gaatha: {
          title: 'ஆடியோ பேட்ஜ்கள் + காதா',
          subtitle: 'ஆடியோ வடிவத்தில் ஊக்கமளிக்கும் முன்னேற்றக் கதைகள்',
          description: 'நீங்கள் கற்றுக் கொள்ளும்போது பேட்ஜ்களைப் பெறுங்கள் மற்றும் தங்கள் இலக்குகளை அடைந்த மற்றவர்களிடமிருந்து ஊக்கமளிக்கும் கதைகளைக் கேளுங்கள். உங்கள் முன்னேற்றத்தைக் கண்காணிக்கவும் ஊக்கத்துடன் இருக்கவும் ஒரு தனித்துவமான வழி.',
          button: 'இப்போது கேளுங்கள்'
        }
      }
    },
    bolbuddy: {
      title: 'உங்கள் இலக்குகள் என்ன?',
      description: 'நீங்கள் எதை அடைய விரும்புகிறீர்கள் என்பதை எங்களிடம் கூறுங்கள். நீங்கள் தட்டச்சு செய்யலாம் அல்லது உங்கள் குரலைப் பயன்படுத்தலாம்.',
      form: {
        label: 'உங்கள் இலக்குகள்',
        placeholder: 'எ.கா., \'நான் வேலை பெற கோடிங் கற்றுக்கொள்ள விரும்புகிறேன்\' அல்லது \'நான் என் சொந்த தொழிலை தொடங்க விரும்புகிறேன்...\'',
        startRecording: 'பதிவைத் தொடங்கு',
        stopRecording: 'பதிவை நிறுத்து',
        button: {
          default: 'எனது வழிகாட்டியைக் கண்டறியவும்',
          loading: 'பொருந்துகிறது...'
        }
      },
      loading: 'உங்களுக்கான சரியான வழிகாட்டியைக் கண்டறிகிறது...',
      toast: {
        error: {
          title: 'வழிகாட்டியைக் கண்டுபிடிக்கத் தவறிவிட்டது'
        }
      }
    },
    voice: {
      unsupported: {
        title: 'ஆதரிக்கப்படாத உலாவி',
        description: 'உங்கள் உலாவி குரல் பதிவை ஆதரிக்கவில்லை.'
      },
      error: {
        title: 'குரல் பிழை',
        description: 'பேச்சை அடையாளம் காண முடியவில்லை'
      }
    },
    joinMentor: {
      title: 'ஒரு வழிகாட்டியாகுங்கள்',
      description: 'உங்கள் அறிவைப் பகிர்ந்து, அடுத்த தலைமுறை திறமையாளர்களுக்கு வழிகாட்டுங்கள். எங்களுடன் சேர கீழே உள்ள படிவத்தை நிரப்பவும்.',
      form: {
        name: { label: 'முழு பெயர்' },
        email: { label: 'மின்னஞ்சல் முகவரி' },
        expertise: { label: 'நிபுணத்துவம் / திறன்கள்', placeholder: 'எ.கா., பைதான், UI/UX வடிவமைப்பு, பொதுப் பேச்சு' },
        bio: { label: 'குறுகிய சுயவிவரம்', placeholder: 'உங்களைப் பற்றியும் உங்கள் அனுபவத்தைப் பற்றியும் எங்களிடம் கொஞ்சம் சொல்லுங்கள்.' },
        button: {
          default: 'வழிகாட்டியாக விண்ணப்பிக்கவும்',
          loading: 'விண்ணப்பத்தைச் சமர்ப்பிக்கிறது...'
        }
      },
      submitted: {
        title: 'நன்றி!',
        description: 'உங்கள் விண்ணப்பம் பெறப்பட்டது. நாங்கள் அதை மதிப்பாய்வு செய்து விரைவில் உங்களைத் தொடர்புகொள்வோம்.'
      },
      toast: {
        title: 'விண்ணப்பம் சமர்ப்பிக்கப்பட்டது!',
        description: 'ஒரு வழிகாட்டியாக மாறுவதில் உங்கள் ஆர்வத்திற்கு நன்றி.'
      }
    },
    errors: {
      "Name must be at least 2 characters.": "பெயர் குறைந்தது 2 எழுத்துகளாக இருக்க வேண்டும்.",
      "Please enter a valid email.": "தயவுசெய்து சரியான மின்னஞ்சலை உள்ளிடவும்.",
      "Please list your areas of expertise (at least 10 characters).": "தயவுசெய்து உங்கள் நிபுணத்துவப் பகுதிகளை (குறைந்தது 10 எழுத்துகள்) பட்டியலிடுங்கள்.",
      "Bio must be at least 20 characters.": "சுயவிவரம் குறைந்தது 20 எழுத்துகளாக இருக்க வேண்டும்.",
      "Name is required": "பெயர் தேவை",
      "Please select a date": "தயவுசெய்து ஒரு தேதியைத் தேர்ந்தெடுக்கவும்",
      "Please tell us a bit more about your goals (at least 10 characters).": "தயவுசெய்து உங்கள் இலக்குகளைப் பற்றி இன்னும் கொஞ்சம் சொல்லுங்கள் (குறைந்தது 10 எழுத்துகள்).",
    },
    mentorCard: {
      about: '{{name}} பற்றி',
      reason: 'நாங்கள் உங்களை ஏன் பொருத்தினோம்',
      listen: 'அறிமுகத்தைக் கேளுங்கள்',
      generating: 'உருவாக்குகிறது...',
      connect: 'இணைக்கவும்',
      bookCall: 'குரல் அழைப்பை பதிவு செய்யவும்'
    },
     mentorConnect: {
        greeting: ' شاباش! உங்கள் வழிகாட்டி இப்போது உங்களுடன் இருக்கிறார்.',
        tabs: {
            voiceMessage: {
                title: 'குரல் செய்தி அனுப்பு',
                description: 'உங்கள் வழிகாட்டிக்கு ஒரு செய்தியைப் பதிவு செய்யுங்கள். ஒரு கேள்வியைக் கேளுங்கள் அல்லது ஒரு புதுப்பிப்பைப் பகிரவும்.',
                placeholder: 'நீங்கள் பதிவுசெய்த செய்தி இங்கே தோன்றும்...',
                button: 'செய்தி அனுப்பு'
            },
            bookCall: {
                title: 'வாராந்திர அழைப்பை பதிவு செய்யவும்',
                description: '{{name}} உடன் ஒருவருக்கு ஒருவர் அழைப்பைத் திட்டமிடுங்கள்.',
                form: {
                    name: { label: 'உங்கள் பெயர்' },
                    date: { label: 'விருப்பமான தேதி' },
                    notes: { label: 'குறிப்புகள் (விருப்பத்தேர்வு)', placeholder: 'நீங்கள் விவாதிக்க விரும்பும் குறிப்பிட்ட ஏதாவது உள்ளதா?' },
                    button: 'அழைப்பை பதிவு செய்யவும்'
                }
            },
            lessons: {
                title: 'ஆடியோ பாடங்கள்',
                description: '{{name}} இடமிருந்து பாடங்களைக் கேளுங்கள்.',
                lesson1: { title: 'பாடம் 1: {{expertise}} அறிமுகம்' },
                lesson2: { title: 'பாடம் 2: முக்கிய கருத்துக்கள்' },
                offline: {
                    title: 'ஆஃப்லைன் அணுகல்',
                    description: 'இணைய இணைப்பு இல்லாவிட்டாலும், எங்கும் கேட்க பாடங்களைப் பதிவிறக்கவும்.'
                }
            }
        },
        messageSent: {
            title: 'செய்தி அனுப்பப்பட்டது!',
            description: 'உங்கள் குரல் செய்தி உங்கள் வழிகாட்டிக்கு அனுப்பப்பட்டது.',
            alertDescription: 'உங்கள் வழிகாட்டி உங்கள் செய்தியைப் பெற்று விரைவில் பதிலளிப்பார்.'
        },
        callBooked: {
            title: 'அழைப்பு பதிவு செய்யப்பட்டது!',
            description: '{{name}} உடன் உங்கள் அழைப்பு திட்டமிடப்பட்டுள்ளது.',
            alertTitle: 'அழைப்பு திட்டமிடப்பட்டது!',
            alertDescription: 'உங்கள் வாராந்திர அழைப்பு பதிவு செய்யப்பட்டுள்ளது. நீங்கள் விரைவில் ஒரு உறுதிப்படுத்தல் மின்னஞ்சலைப் பெறுவீர்கள்.'
        }
    }
  },
  mr: {
    nav: {
      language: 'भाषा',
      joinAsMentor: 'मार्गदर्शक म्हणून सामील व्हा',
      signIn: 'साइन इन करा',
      signOut: 'साइन आउट करा',
    },
    home: {
      hero: {
        title: 'तुमचा योग्य मार्गदर्शक शोधा',
        subtitle: 'तुमची उद्दिष्टे साध्य करण्यात मदत करणाऱ्या मार्गदर्शकांशी संपर्क साधण्यासाठी AI च्या शक्तीचा वापर करा. तुम्हाला काय शिकायचे आहे ते सांगा आणि आम्ही तुमच्यासाठी योग्य जुळणी शोधू.',
      },
      features: {
        gupshup: {
          title: 'गपशप गुरुकुल',
          subtitle: 'शिकण्यासाठी आणि प्रेरणासाठी पीअर व्हॉइस ग्रुप',
          description: 'व्हॉइस-आधारित गटांमध्ये सहकारी शिकणाऱ्यांशी कनेक्ट व्हा. तुमची प्रगती शेअर करा, प्रश्न विचारा आणि तुमच्या प्रवासात एकत्र प्रेरित रहा.',
          button: 'गटामध्ये सामील व्हा',
        },
        whisper: {
          title: 'व्हिस्परआस्क',
          subtitle: 'अनामिकपणे प्रश्न विचारा',
          description: 'तुम्ही विचारण्यास संकोच करत असलेला प्रश्न आहे का? मार्गदर्शकांकडून अनामिकपणे आणि गोपनीयतेने उत्तरे मिळवण्यासाठी व्हिस्परआस्क वापरा.',
          button: 'प्रश्न विचारा',
        },
        shruti: {
          title: 'श्रुती मोड',
          subtitle: 'डाउनलोड केलेल्या ऑडिओद्वारे ऑफलाइन कार्य करते',
          description: 'इंटरनेट कनेक्शनशिवायही, कधीही, कुठेही तुमची शिक्षण सामग्री मिळवा. ऑडिओ सामग्री डाउनलोड करा आणि तुमची प्रगती ऑफलाइन सुरू ठेवा.',
          button: 'अधिक जाणून घ्या',
        },
        gaatha: {
          title: 'ऑडिओ बॅज + गाथा',
          subtitle: 'ऑडिओ स्वरूपात प्रेरक प्रगतीच्या कथा',
          description: 'तुम्ही शिकत असताना बॅज मिळवा आणि ज्यांनी आपली उद्दिष्टे साध्य केली आहेत त्यांच्या प्रेरणादायी कथा ऐका. तुमच्या प्रगतीचा मागोवा ठेवण्याचा आणि प्रेरित राहण्याचा एक अनोखा मार्ग.',
          button: 'आता ऐका',
        },
      },
    },
    bolbuddy: {
      title: 'तुमची ध्येये काय आहेत?',
      description: 'तुम्हाला काय साध्य करायचे आहे ते आम्हाला सांगा. तुम्ही टाइप करू शकता किंवा तुमच्या आवाजाचा वापर करू शकता.',
      form: {
        label: 'तुमची ध्येये',
        placeholder: 'उदा., \'मला नोकरी मिळवण्यासाठी कोडिंग शिकायचे आहे\' किंवा \'मला माझा स्वतःचा व्यवसाय सुरू करायचा आहे...\'',
        startRecording: 'रेकॉर्डिंग सुरू करा',
        stopRecording: 'रेकॉर्डिंग थांबवा',
        button: {
          default: 'माझा मार्गदर्शक शोधा',
          loading: 'जुळत आहे...',
        },
      },
      loading: 'तुमच्यासाठी योग्य मार्गदर्शक शोधत आहे...',
      toast: {
        error: {
          title: 'मार्गदर्शक शोधण्यात अयशस्वी',
        },
      },
    },
    voice: {
      unsupported: {
        title: 'समर्थन नसलेला ब्राउझर',
        description: 'तुमचा ब्राउझर व्हॉइस रेकॉर्डिंगला समर्थन देत नाही.',
      },
      error: {
        title: 'आवाज त्रुटी',
        description: 'बोलणे ओळखता आले नाही',
      },
    },
    joinMentor: {
      title: 'मार्गदर्शक बना',
      description: 'तुमचे ज्ञान शेअर करा आणि पुढच्या पिढीच्या प्रतिभेला मार्गदर्शन करा. आमच्यात सामील होण्यासाठी खालील फॉर्म भरा.',
      form: {
        name: { label: 'पूर्ण नाव' },
        email: { label: 'ईमेल पत्ता' },
        expertise: { label: 'विशेषज्ञता / कौशल्ये', placeholder: 'उदा., पायथन, UI/UX डिझाइन, सार्वजनिक भाषण' },
        bio: { label: 'लहान बायो', placeholder: 'आम्हाला तुमच्याबद्दल आणि तुमच्या अनुभवाबद्दल थोडे सांगा.' },
        button: {
          default: 'मार्गदर्शक होण्यासाठी अर्ज करा',
          loading: 'अर्ज सबमिट होत आहे...',
        },
      },
      submitted: {
        title: 'धन्यवाद!',
        description: 'तुमचा अर्ज प्राप्त झाला आहे. आम्ही त्याचे पुनरावलोकन करू आणि लवकरच तुमच्याशी संपर्क साधू.',
      },
      toast: {
        title: 'अर्ज सबमिट केला!',
        description: 'मार्गदर्शक बनण्यात रस दाखवल्याबद्दल धन्यवाद.',
      },
    },
    errors: {
      'Name must be at least 2 characters.': 'नाव किमान २ अक्षरांचे असावे.',
      'Please enter a valid email.': 'कृपया वैध ईमेल प्रविष्ट करा.',
      'Please list your areas of expertise (at least 10 characters).': 'कृपया तुमच्या कौशल्याची क्षेत्रे (किमान १० अक्षरे) सूचीबद्ध करा.',
      'Bio must be at least 20 characters.': 'बायो किमान २० अक्षरांचा असावा.',
      'Name is required': 'नाव आवश्यक आहे',
      'Please select a date': 'कृपया एक तारीख निवडा',
      'Please tell us a bit more about your goals (at least 10 characters).': 'कृपया तुमच्या ध्येयांबद्दल आम्हाला आणखी थोडे सांगा (किमान १० अक्षरे).',
    },
    mentorCard: {
      about: '{{name}} बद्दल',
      reason: 'आम्ही तुम्हाला का जुळवले',
      listen: 'परिचय ऐका',
      generating: 'तयार होत आहे...',
      connect: 'कनेक्ट करा',
      bookCall: 'व्हॉइस कॉल बुक करा',
    },
    mentorConnect: {
      greeting: 'शाब्बास! तुमचा मार्गदर्शक आता तुमच्यासोबत आहे.',
      tabs: {
        voiceMessage: {
          title: 'व्हॉइस संदेश पाठवा',
          description: 'तुमच्या मार्गदर्शकासाठी एक संदेश रेकॉर्ड करा. एक प्रश्न विचारा किंवा एक अपडेट शेअर करा.',
          placeholder: 'तुमचा रेकॉर्ड केलेला संदेश येथे दिसेल...',
          button: 'संदेश पाठवा',
        },
        bookCall: {
          title: 'साप्ताहिक कॉल बुक करा',
          description: '{{name}} सोबत वन-ऑन-वन कॉल शेड्यूल करा.',
          form: {
            name: { label: 'तुमचे नाव' },
            date: { label: 'पसंतीची तारीख' },
            notes: { label: 'टीप (पर्यायी)', placeholder: 'तुम्हाला विशिष्ट काहीतरी चर्चा करायची आहे का?' },
            button: 'कॉल बुक करा',
          },
        },
        lessons: {
          title: 'ऑडिओ पाठ',
          description: '{{name}} कडून पाठ ऐका.',
          lesson1: { title: 'पाठ १: {{expertise}} चा परिचय' },
          lesson2: { title: 'पाठ २: मुख्य संकल्पना' },
          offline: {
            title: 'ऑफलाइन प्रवेश',
            description: 'इंटरनेट कनेक्शनशिवाय कुठेही ऐकण्यासाठी पाठ डाउनलोड करा.',
          },
        },
      },
      messageSent: {
        title: 'संदेश पाठवला!',
        description: 'तुमचा व्हॉइस संदेश तुमच्या मार्गदर्शकाला पाठवला गेला आहे.',
        alertDescription: 'तुमचा मार्गदर्शक तुमचा संदेश प्राप्त करेल आणि लवकरच प्रतिसाद देईल.',
      },
      callBooked: {
        title: 'कॉल बुक झाली!',
        description: '{{name}} सोबत तुमचा कॉल शेड्यूल झाला आहे.',
        alertTitle: 'कॉल शेड्यूल झाली!',
        alertDescription: 'तुमचा साप्ताहिक कॉल बुक झाला आहे. तुम्हाला लवकरच एक पुष्टीकरण ईमेल मिळेल.',
      },
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, options?: { [key: string]: string | number }) => string;
  tError: (key: string | undefined) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
  tError: () => '',
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string, options?: { [key: string]: string | number }) => {
    const keys = key.split('.');
    let result = translations[language] as any;
    for (const k of keys) {
      result = result?.[k];
    }

    if (typeof result === 'string' && options) {
        Object.keys(options).forEach(optKey => {
            result = result.replace(`{{${optKey}}}`, String(options[optKey]));
        });
    }

    return result || key;
  };
  
  const tError = (key: string | undefined) => {
    if (!key) return '';
    const errorTranslations = translations[language].errors as {[key: string]: string};
    return errorTranslations[key] || key;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tError }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
