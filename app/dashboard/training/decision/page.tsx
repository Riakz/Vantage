"use client";

import { NeonButton } from "@/components/ui/NeonButton";
import { useState } from "react";
import { Brain, CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";

const SCENARIOS = [
    {
        id: 1,
        title: "Retake A - Haven",
        image: "/scenarios/haven-a.jpg", // Placeholder
        description: "You are Omen (Defender). Bomb planted A Default. 2v3 situation. You have Logic, Paranoia, and Ultimate. Enemy Sova scanned Short, Jett is Heaven.",
        options: [
            { id: 'a', text: "Smoke Heaven and Short, then tap bomb to bait.", correct: false, feedback: "Risky. Jett has high ground advantage and Sova can shock dart the tap." },
            { id: 'b', text: "Ult to A Long (Flank) to pinch them.", correct: false, feedback: "Too slow. Bomb timer is ticking and you leave your teammate alone." },
            { id: 'c', text: "Flash A Short, tp on top of boxes, wait for teammate contact.", correct: true, feedback: "Correct! Isolating the Sova first while taking an off-angle maximizes trade potential." }
        ]
    },
    {
        id: 2,
        title: "Post-Plant B - Ascent",
        description: "You are Jett (Attacker). 1v1 against Viper. Bomb planted Boathouse. You have 2 knives left. Viper used her pit on the bomb.",
        options: [
            { id: 'a', text: "Dash into the pit and right-click.", correct: false, feedback: "Suicide mission. Viper has decay advantage and vision inside her ult." },
            { id: 'b', text: "Wait outside pit, spam smoke, play time.", correct: true, feedback: "Correct! Viper must check the bomb defuse sound. You have knives for perfect accuracy through smoke if you spot her." },
            { id: 'c', text: "Updraft and hover over the pit.", correct: false, feedback: "You're a sitting duck in the air with inaccurate knives (right click) or hard to hit left clicks." }
        ]
    }
];

export default function DecisionTrainer() {
    const [currentStep, setCurrentStep] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);

    const scenario = SCENARIOS[currentStep];

    const handleSelect = (id: string) => {
        if (showFeedback) return;
        setSelected(id);
        setShowFeedback(true);
    };

    const nextScenario = () => {
        if (currentStep < SCENARIOS.length - 1) {
            setCurrentStep(c => c + 1);
            setSelected(null);
            setShowFeedback(false);
        } else {
            // End
            alert("Training Complete - Good Game!");
            setCurrentStep(0);
            setSelected(null);
            setShowFeedback(false);
        }
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tighter">Decision <span className="text-accent">Forge</span></h1>
                    <p className="text-muted-foreground">Analyze. Adapt. Overcome.</p>
                </div>
                <div className="text-right">
                    <div className="text-4xl font-mono font-bold text-accent">0{currentStep + 1}</div>
                    <div className="text-sm uppercase text-muted-foreground">Scenario</div>
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 space-y-8">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">{scenario.title}</h2>
                    <div className="bg-secondary/20 p-4 rounded-lg border-l-4 border-accent text-lg leading-relaxed">
                        {scenario.description}
                    </div>
                </div>

                <div className="space-y-3">
                    {scenario.options.map((opt) => {
                        const isSelected = selected === opt.id;
                        const isCorrect = opt.correct;

                        let variant = "outline";
                        if (showFeedback) {
                            if (isSelected && isCorrect) variant = "success"; // Need to add success variant or use style
                            else if (isSelected && !isCorrect) variant = "destructive";
                            else if (!isSelected && isCorrect) variant = "success_outline";
                        }

                        return (
                            <div
                                key={opt.id}
                                onClick={() => handleSelect(opt.id)}
                                className={`
                                    p-4 rounded-lg border-2 cursor-pointer transition-all
                                    ${!showFeedback && "hover:border-primary hover:bg-primary/5 border-border"}
                                    ${showFeedback && isSelected && isCorrect && "border-green-500 bg-green-500/20"}
                                    ${showFeedback && isSelected && !isCorrect && "border-red-500 bg-red-500/20"}
                                    ${showFeedback && !isSelected && isCorrect && "border-green-500 border-dashed opacity-70"}
                                    ${showFeedback && !isSelected && !isCorrect && "border-border opacity-50"}
                                `}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`
                                        w-8 h-8 rounded-full flex items-center justify-center font-bold border-2
                                        ${showFeedback && isSelected && isCorrect ? "border-green-500 text-green-500" : "border-muted-foreground text-muted-foreground"}
                                    `}>
                                        {opt.id.toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">{opt.text}</p>
                                        {showFeedback && isSelected && (
                                            <p className={`mt-2 text-sm ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                                                {isCorrect ? <CheckCircle className="inline w-4 h-4 mr-1" /> : <XCircle className="inline w-4 h-4 mr-1" />}
                                                {opt.feedback}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {showFeedback && (
                    <div className="flex justify-end pt-4">
                        <NeonButton onClick={nextScenario} variant="primary">
                            Next Scenario
                        </NeonButton>
                    </div>
                )}
            </div>
        </div>
    );
}
