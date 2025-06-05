import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Mic, MicOff, User } from "lucide-react";
import { theme } from "@/theme";
import Header from "@/components/Header";
import { conversation } from "@/data/conversation";

const Speech = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState<Array<{ role: string, content: string }>>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [simulationStarted, setSimulationStarted] = useState(false);
  const [processedAudios, setProcessedAudios] = useState<Set<string>>(new Set());

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const navigate = useNavigate();

  // Load introduction and first assistant message when component mounts
  useEffect(() => {
    console.log('Speech component mounted, starting conversation simulation');
    
    // Add introduction message to conversation
    if (conversation.introduction) {
      setMessages(prev => {
        // Check if introduction is already in the messages array
        const introExists = prev.some(msg => 
          msg.role === "assistant" && msg.content === conversation.introduction.content[0]
        );
        
        if (introExists) {
          return prev;
        }
        
        return [...prev, {
          role: "assistant",
          content: conversation.introduction.content[0]
        }];
      });
      
      // Play introduction audio after a short delay
      setTimeout(() => {
        if (conversation.introduction.audio) {
          playAudio(conversation.introduction.audio);
        }
      }, 500);
    }
    
    // Add first assistant message to conversation if it exists
    if (conversation.communication.length > 0 && conversation.communication[0].role === "assistant") {
      const firstAssistant = conversation.communication[0];
      
      setMessages(prev => {
        // Check if first assistant message is already in the messages array
        const messageExists = prev.some(msg =>
          msg.role === "assistant" && msg.content === firstAssistant.content[0]
        );
        
        if (messageExists) {
          return prev;
        }
        
        return [...prev, {
          role: "assistant",
          content: firstAssistant.content[0]
        }];
      });
    }
  }, []); // Empty dependency array means this runs once on mount

  // Function to play audio file
  const playAudio = (audioFile: string) => {
    console.log('Playing audio:', audioFile);
    
    // Don't play if already processed
    if (processedAudios.has(audioFile)) {
      console.log(`Audio ${audioFile} already processed, skipping`);
      // Move to next step if this was an assistant message
      if (currentStep < conversation.communication.length && 
          conversation.communication[currentStep].role === 'assistant' &&
          conversation.communication[currentStep].audio === audioFile) {
        console.log('Moving to next step after skipping processed assistant audio');
        setCurrentStep(prev => prev + 1);
      }
      return;
    }

    if (audioRef.current) {
      // Reset the audio element
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      
      // Set the source
      const audioSrc = `/audio/${audioFile}`;
      console.log('Setting audio source to:', audioSrc);
      audioRef.current.src = audioSrc;
      
      // Update state for UI
      setCurrentAudio(audioFile);
      setIsPlaying(true);
      
      // Play the audio with proper error handling
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log(`Audio playback started successfully: ${audioFile}`);
            // Mark this audio as processed
            setProcessedAudios(prev => new Set(prev).add(audioFile));
          })
          .catch(error => {
            console.error(`Error playing audio ${audioFile}:`, error);
            setIsPlaying(false);
            
            // If this was an assistant message, move to next step even if audio fails
            if (currentStep < conversation.communication.length && 
                conversation.communication[currentStep].role === 'assistant' &&
                conversation.communication[currentStep].audio === audioFile) {
              console.log('Moving to next step after audio playback error');
              setCurrentStep(prev => prev + 1);
            }
          });
      }
    } else {
      console.error('Audio reference is not available');
    }
  };

  // Handle audio ended event
  const handleAudioEnded = () => {
    console.log('Audio ended:', currentAudio);
    setIsPlaying(false);

    // Handle different types of audio ending
    if (!currentAudio) return;
    
    // Handle introduction audio ending
    if (currentAudio === conversation.introduction.audio) {
      console.log('Introduction audio ended, moving to first step');
      // After introduction, move to first communication step
      if (conversation.communication.length > 0) {
        setCurrentStep(0); // Ensure we're at the first step
        // If first step is assistant, progress the conversation
        if (conversation.communication[0].role === 'assistant') {
          setTimeout(() => progressConversation(), 1000);
        }
      }
    } 
    // Handle user audio response ending
    else if (currentAudio && (currentAudio.includes('Human') || currentAudio.includes('human'))) {
      console.log('User audio response ended, auto-toggling recording and playing next assistant message');
      
      // Auto-toggle recording state when user audio ends
      setIsRecording(false);
      setShowMessage(true); // Show "Listening..." message
      
      // Find the current step index based on the audio file
      let nextStep = currentStep;
      let userStepIndex = -1;
      
      // Find which step this user audio belongs to
      for (let i = 0; i < conversation.communication.length; i++) {
        const item = conversation.communication[i];
        if (item.audio === currentAudio) {
          userStepIndex = i;
          nextStep = i + 1;
          break;
        }
      }
      
      console.log('Found user audio at step:', userStepIndex, 'moving to step:', nextStep);
      
      // Set the next step
      setCurrentStep(nextStep);
      
      // Force play the next assistant message after a delay
      setTimeout(() => {
        console.log('Playing next assistant message after user audio ended');
        if (nextStep < conversation.communication.length) {
          const nextItem = conversation.communication[nextStep];
          if (nextItem && nextItem.role === "assistant" && nextItem.audio) {
            console.log('Found next assistant message, playing audio:', nextItem.audio);
            
            // Add the assistant message to the conversation
            setMessages(prev => {
              // Check if this message is already in the messages array
              const messageExists = prev.some(msg =>
                msg.role === "assistant" && msg.content === nextItem.content[0]
              );

              if (messageExists) {
                return prev;
              }

              return [...prev, {
                role: "assistant",
                content: nextItem.content[0]
              }];
            });
            
            // Play the audio directly
            playAudio(nextItem.audio);
          } else {
            console.log('No valid assistant message found at step:', nextStep);
            progressConversation();
          }
        } else {
          console.log('End of conversation, showing wrap-up');
          progressConversation();
        }
      }, 2000); // Wait 2 seconds before playing next assistant audio
    }
    // Handle assistant audio ending
    else {
      console.log('Assistant audio ended, waiting for user input');
      // For regular assistant messages, don't automatically progress
      // Wait for user to click mic button
    }
  };

  // Initialize conversation and start audio playback automatically
  useEffect(() => {
    // Add introduction messages
    const initialMessages = conversation.introduction.content.map(content => ({
      role: "assistant",
      content
    }));

    // Add first question
    if (conversation.communication.length > 0) {
      initialMessages.push({
        role: conversation.communication[0].role,
        content: conversation.communication[0].content[0]
      });
    }

    setMessages(initialMessages);

    // Automatically start the simulation after a short delay
    const timer = setTimeout(() => {
      setSimulationStarted(true);

      // Play introduction audio
      if (conversation.introduction.audio) {
        playAudio(conversation.introduction.audio);
      }
    }, 1000);

    // Clean up timers when component unmounts
    return () => {
      clearTimeout(timer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  const toggleRecording = () => {
    console.log('Toggle recording called, isRecording:', isRecording, 'isPlaying:', isPlaying, 'currentStep:', currentStep);
    
    // Don't allow recording while audio is playing
    if (isPlaying) {
      console.log('Audio is playing, ignoring mic button click');
      return;
    }

    // Find the current user step
    let userStepIndex = currentStep;
    if (currentStep < conversation.communication.length && conversation.communication[currentStep].role === 'assistant') {
      userStepIndex = currentStep + 1;
    }
    
    // Make sure we have a valid user step
    if (userStepIndex < conversation.communication.length && 
        conversation.communication[userStepIndex].role === 'user') {
      
      const userStep = conversation.communication[userStepIndex];
      console.log('Found user step at index:', userStepIndex, userStep);
      
      if (!isRecording) {
        // First click - Start recording and play user audio immediately
        console.log('Starting recording simulation and playing user audio');
        setIsRecording(true);
        setShowMessage(false);
        
        // Add user message to conversation
        setMessages(prev => {
          // Check if this message is already in the messages array
          const messageExists = prev.some(msg =>
            msg.role === "user" && msg.content === userStep.content[0]
          );
          
          if (messageExists) {
            return prev;
          }
          
          return [...prev, {
            role: "user",
            content: userStep.content[0]
          }];
        });
        
        // Play the user audio file immediately
        if (userStep.audio) {
          console.log('Playing user audio file:', userStep.audio);
          
          // Directly control the audio element
          if (audioRef.current) {
            // Reset the audio element
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            
            // Set the source and play
            const audioSrc = `/audio/${userStep.audio}`;
            console.log('Setting audio source to:', audioSrc);
            audioRef.current.src = audioSrc;
            
            // Update state for UI
            setCurrentAudio(userStep.audio);
            setIsPlaying(true);
            
            // Play the audio
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
              playPromise
                .then(() => {
                  console.log('User audio playback started successfully');
                  // Mark as processed
                  setProcessedAudios(prev => new Set(prev).add(userStep.audio));
                })
                .catch(error => {
                  console.error('Error playing user audio:', error);
                  setIsPlaying(false);
                });
            }
          }
        }
      } else {
        // Second click - Stop recording and move to next assistant message
        console.log('Stopping recording simulation and moving to next assistant message');
        setIsRecording(false);
        setShowMessage(true); // Show "Listening..." message
        
        // Move to the next step (which should be an assistant message)
        setCurrentStep(userStepIndex + 1);
        
        // Progress the conversation to play the next assistant message
        setTimeout(() => {
          progressConversation();
        }, 1000);
      }
    } else if (currentStep >= conversation.communication.length) {
      // End of conversation, go to analyzing
      console.log('End of conversation, navigating to analyzing page');
      setTimeout(() => {
        navigate('/analyzing');
      }, 2000);
    } else {
      console.log('No valid user step found, moving to next step');
      setCurrentStep(prev => prev + 1);
    }
  };

  // This function is no longer needed as simulation starts automatically
  // Keeping it as a placeholder in case we need to restart the simulation
  const startSimulation = () => {
    // Function now handled by useEffect
  };

  // Progress to the next step in the conversation
  const progressConversation = () => {
    console.log('Progressing conversation, current step:', currentStep);

    // If we're at the end of the conversation
    if (currentStep >= conversation.communication.length) {
      console.log('Reached end of conversation, showing wrap-up');
      // End of conversation, show wrap-up message and play audio
      if (conversation.wrapup) {
        // Check if we've already processed the wrap-up
        const wrapupKey = conversation.wrapup.audio || 'wrapup';
        if (processedAudios.has(wrapupKey)) {
          console.log('Already processed wrap-up, navigating to analyzing');
          navigate('/analyzing');
          return;
        }

        setMessages(prev => {
          // Check if wrapup message is already in the messages array
          const messageExists = prev.some(msg =>
            msg.role === "assistant" && msg.content === conversation.wrapup.content[0]
          );

          if (messageExists) {
            return prev;
          }

          return [...prev, {
            role: "assistant",
            content: conversation.wrapup.content[0]
          }];
        });

        if (conversation.wrapup.audio) {
          setTimeout(() => {
            playAudio(conversation.wrapup.audio);
          }, 2000); // Wait 2 seconds before playing wrap-up audio
        } else {
          // If no audio, mark as processed
          setProcessedAudios(prev => new Set(prev).add(wrapupKey));
          // Navigate to analyzing page after wrap-up
          setTimeout(() => {
            navigate('/analyzing');
          }, 5000);
        }
      } else {
        // Navigate to analyzing page
        setTimeout(() => {
          navigate('/analyzing');
        }, 5000);
      }
      return;
    }

    // Get the current conversation item
    const nextItem = conversation.communication[currentStep];
    console.log('Next item:', nextItem);

    // If this is an assistant message, add it to the conversation and play audio
    if (nextItem && nextItem.role === "assistant") {
      console.log('Processing assistant message');
      // Check if we've already processed this message
      const audioKey = nextItem.audio || `assistant-${currentStep}`;
      if (processedAudios.has(audioKey)) {
        console.log(`Already processed step ${currentStep}, moving to next`);
        setCurrentStep(prev => prev + 1);
        return;
      }

      // Add the assistant message to the conversation
      setMessages(prev => {
        // Check if this message is already in the messages array
        const messageExists = prev.some(msg =>
          msg.role === "assistant" && msg.content === nextItem.content[0]
        );

        if (messageExists) {
          return prev;
        }

        return [...prev, {
          role: "assistant",
          content: nextItem.content[0]
        }];
      });

      // Play the audio file if available after a 2 second delay
      if (nextItem.audio) {
        setTimeout(() => {
          playAudio(nextItem.audio);
        }, 2000); // Wait 2 seconds before playing assistant audio
      } else {
        // If no audio, mark as processed and move to next step after a delay
        setProcessedAudios(prev => new Set(prev).add(audioKey));
        setTimeout(() => {
          setCurrentStep(prev => prev + 1);
        }, 2000);
      }
    } else if (nextItem && nextItem.role === "user") {
      // For user messages, we'll wait for user to click mic button
      console.log('Waiting for user to click mic button for step:', currentStep);
      // Don't automatically increment step here
    } else {
      // If we have an invalid step, move to the next one
      console.log('Invalid step, moving to next');
      setCurrentStep(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: theme.background.primary }}>
      {/* Hidden audio element for playback */}
      <audio
        ref={audioRef}
        onEnded={handleAudioEnded}
        style={{ display: 'none' }}
      />
      <Header
        showBackButton={true}
        onBackClick={() => navigate('/welcome')}
      />
      <div className="flex-1 p-4">
        <div className="container">
          {/* Header */}
          <div className="flex justify-between items-center text-white mb-8 pt-4">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/welcome')}
                className="text-white hover:bg-white/10 mr-4"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h1 className="text-2xl font-bold">Speech Assessment</h1>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                console.log('End Assessment clicked, playing wrapup');
                // Play wrapup audio if available
                if (conversation.wrapup && conversation.wrapup.audio) {
                  // Add wrapup message to conversation
                  setMessages(prev => {
                    // Check if wrapup message is already in the messages array
                    const messageExists = prev.some(msg =>
                      msg.role === "assistant" && msg.content === conversation.wrapup.content[0]
                    );

                    if (messageExists) {
                      return prev;
                    }

                    return [...prev, {
                      role: "assistant",
                      content: conversation.wrapup.content[0]
                    }];
                  });
                  
                  // Set a flag to indicate we're playing the wrapup audio
                  const wrapupAudioKey = conversation.wrapup.audio;
                  
                  // Play the wrapup audio
                  if (audioRef.current) {
                    // Reset the audio element
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                    
                    // Set the source
                    const audioSrc = `/audio/${wrapupAudioKey}`;
                    console.log('Setting wrapup audio source to:', audioSrc);
                    audioRef.current.src = audioSrc;
                    
                    // Update state for UI
                    setCurrentAudio(wrapupAudioKey);
                    setIsPlaying(true);
                    
                    // Add an event listener specifically for the wrapup audio ending
                    const handleWrapupEnded = () => {
                      console.log('Wrapup audio ended, waiting 2 seconds before redirecting');
                      setIsPlaying(false);
                      
                      // Wait 2 seconds after audio completes before redirecting
                      setTimeout(() => {
                        console.log('Redirecting to analyzing page');
                        navigate('/analyzing');
                      }, 2000);
                      
                      // Remove the event listener after it fires
                      audioRef.current?.removeEventListener('ended', handleWrapupEnded);
                    };
                    
                    // Add the one-time event listener
                    audioRef.current.addEventListener('ended', handleWrapupEnded);
                    
                    // Play the audio
                    const playPromise = audioRef.current.play();
                    if (playPromise !== undefined) {
                      playPromise
                        .then(() => {
                          console.log('Wrapup audio playback started successfully');
                        })
                        .catch(error => {
                          console.error('Error playing wrapup audio:', error);
                          setIsPlaying(false);
                          // If audio fails, redirect after 2 seconds
                          setTimeout(() => navigate('/analyzing'), 2000);
                        });
                    }
                  }
                } else {
                  // No wrapup audio, just navigate after 2 seconds
                  console.log('No wrapup audio, redirecting after 2 seconds');
                  setTimeout(() => {
                    navigate('/analyzing');
                  }, 2000);
                }
              }}
              className="bg-red-600 hover:bg-red-800 hover:text-white rounded-full text-white border-red-400"
              disabled={isPlaying}
            >
              End Assessment
            </Button>
          </div>

          <div className="flex w-[100%] gap-6  items-center justify-center">
            {/* Left Column - Recording Interface */}
            <div className="text-center flex-1 p-4">
              
              {/* Microphone Button */}
              <div className="mb-8">
                <Button
                  onClick={toggleRecording}
                  size="lg"
                  className={`w-32 h-32 rounded-full transition-all duration-300 transform hover:scale-110 ${isRecording
                    ? 'bg-red-500 hover:bg-red-600 recording-pulse'
                    : 'bg-white hover:bg-gray-100'
                    }`}
                  disabled={isPlaying}
                >
                  {isRecording ? (
                    <MicOff className="text-white" style={{ width: '50px', height: '50px' }} />
                  ) : (
                    <Mic className="text-blue-600" style={{ width: '50px', height: '50px' }} />
                  )}
                </Button>
              </div>

              {/* Status Text */}
              <div className="text-white">
                <h2 className="text-2xl font-bold mb-2">
                  {!simulationStarted ? 'Start Assessment' :
                    isRecording ? 'Recording...' :
                      isPlaying ? 'Listening...' : 'Your Turn'}
                </h2>
                <p className="text-lg opacity-90 mb-6">
                  {!simulationStarted ? 'Click the microphone to begin' :
                    isRecording ? 'Speak clearly into your device' :
                      isPlaying ? 'Please wait while audio plays' : 'Click to record your response'}
                </p>
              </div>
            </div>

            {/* Right Column - Conversation Interface */}
            <div className="flex-1 border border-white/10 rounded-lg p-6 bg-white/5 backdrop-blur-sm overflow-y-auto max-h-[70vh]">
              <h2 className="text-xl font-bold text-white mb-4">Conversation</h2>

              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${message.role === 'assistant'
                          ? 'bg-blue-600 text-white rounded-tl-none'
                          : 'bg-white text-gray-800 rounded-tr-none'
                        }`}
                    >
                      {message.role === 'assistant' && (
                        <div className="flex items-center mb-1">
                          <div className="w-5 h-5 rounded-full bg-blue-400 flex items-center justify-center mr-2">
                            <img src="/logo.png" alt="AUZ AI" className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-semibold">AUZ AI</span>
                        </div>
                      )}
                      {message.role === 'user' && (
                        <div className="flex items-center justify-end mb-1">
                          <span className="text-xs font-semibold mr-2">You</span>
                          <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="w-3 h-3 text-gray-600" />
                          </div>
                        </div>
                      )}
                      <p className={`text-sm ${message.role === 'assistant' ? 'text-white' : 'text-gray-800'}`}>
                        {message.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Typing indicator when recording */}
              {isRecording && (
                <div className="mt-4 flex">
                  <div className="bg-gray-200 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Speech;
