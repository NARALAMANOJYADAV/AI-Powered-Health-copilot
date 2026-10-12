"use client";

import React, { useState, useEffect } from "react";
import { useCareLensStore } from "@/lib/store";
import { OCRWord, DocumentExtraction } from "@/lib/types";
import { Navbar } from "@/components/layout/Navbar";
import { BottomTabBar } from "@/components/layout/BottomTabBar";
import { BentoDashboard } from "@/components/dashboard/BentoDashboard";
import { DocumentScanner } from "@/components/upload/DocumentScanner";
import { VerificationCanvas } from "@/components/verify/VerificationCanvas";
import { ReportDetailView } from "@/components/detail/ReportDetailView";
import { HealthTimeline } from "@/components/timeline/HealthTimeline";
import { BiomarkerCharts } from "@/components/trends/BiomarkerCharts";
import { MedicationSchedule } from "@/components/medications/MedicationSchedule";
import { AskMyRecords } from "@/components/ask/AskMyRecords";
import { DoctorVisitBrief } from "@/components/brief/DoctorVisitBrief";
import { FamilyProfiles } from "@/components/family/FamilyProfiles";
import { ABDMHub } from "@/components/abdm/ABDMHub";
import { SettingsView } from "@/components/settings/SettingsView";

export default function CareLensApp() {
  const { theme, accessibility, language } = useCareLensStore();

  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [presetSample, setPresetSample] = useState<"diabetes_lab" | "cardiac_prescription" | null>(null);

  // Active Document Extraction state for flow (Upload -> Verify -> Detail)
  const [currentScanData, setCurrentScanData] = useState<{
    imageUrl: string;
    fileKey: string;
    fileName: string;
    words: OCRWord[];
    maskedWords: OCRWord[];
    extraction: DocumentExtraction;
  } | null>(null);

  // Apply theme and accessibility data attributes to <html> / <body>
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
      document.documentElement.setAttribute("data-accessibility", accessibility);
    }
  }, [theme, accessibility]);

  // Handler when DocumentScanner finishes OCR & extraction
  const handleExtractionComplete = (data: {
    imageUrl: string;
    fileKey: string;
    fileName: string;
    words: OCRWord[];
    maskedWords: OCRWord[];
    extraction: DocumentExtraction;
  }) => {
    setCurrentScanData(data);
    setPresetSample(null);
    setActiveTab("verify");
  };

  // Handler when user confirms findings on Verification Canvas
  const handleSaveConfirmed = async (verifiedExtraction: DocumentExtraction) => {
    if (!currentScanData) return;
    setCurrentScanData({
      ...currentScanData,
      extraction: verifiedExtraction,
    });
    setActiveTab("detail");
  };

  // Quick preset launcher from Dashboard
  const handleScanSample = (sampleType: "diabetes_lab" | "cardiac_prescription") => {
    setPresetSample(sampleType);
    setActiveTab("upload");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Main Screen Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === "dashboard" && (
          <BentoDashboard
            onNavigate={setActiveTab}
            onScanSample={handleScanSample}
          />
        )}

        {activeTab === "upload" && (
          <DocumentScanner
            onExtractionComplete={handleExtractionComplete}
            presetSample={presetSample}
          />
        )}

        {activeTab === "verify" && currentScanData && (
          <VerificationCanvas
            imageUrl={currentScanData.imageUrl}
            fileKey={currentScanData.fileKey}
            fileName={currentScanData.fileName}
            words={currentScanData.words}
            extraction={currentScanData.extraction}
            onSaveConfirmed={handleSaveConfirmed}
            onCancel={() => setActiveTab("dashboard")}
          />
        )}

        {activeTab === "detail" && currentScanData && (
          <ReportDetailView
            imageUrl={currentScanData.imageUrl}
            fileName={currentScanData.fileName}
            words={currentScanData.words}
            extraction={currentScanData.extraction}
            onBack={() => setActiveTab("dashboard")}
            onNavigateToSchedule={() => setActiveTab("medications")}
            onNavigateToBrief={() => setActiveTab("brief")}
          />
        )}

        {activeTab === "timeline" && (
          <HealthTimeline
            onSelectEvent={() => {
              // Open default metabolic report
              handleScanSample("diabetes_lab");
            }}
            onNavigateToUpload={() => setActiveTab("upload")}
          />
        )}

        {activeTab === "trends" && <BiomarkerCharts />}

        {activeTab === "medications" && <MedicationSchedule />}

        {activeTab === "ask" && (
          <AskMyRecords
            onOpenReport={() => {
              handleScanSample("diabetes_lab");
            }}
          />
        )}

        {activeTab === "brief" && <DoctorVisitBrief />}

        {activeTab === "family" && (
          <FamilyProfiles
            onSelectProfile={() => {
              setActiveTab("dashboard");
            }}
          />
        )}

        {activeTab === "abdm" && <ABDMHub />}

        {activeTab === "settings" && <SettingsView />}
      </main>

      {/* Mobile-First Bottom Tab Bar */}
      <BottomTabBar activeTab={activeTab} onSelectTab={setActiveTab} />
    </div>
  );
}
