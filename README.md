# AI-Powered Crop Disease & Pest Early Detection and Management System

> A software-only, AI-powered crop-health decision-support platform for early
> disease and pest detection, risk assessment, and integrated crop management.

[![Smart India Hackathon 2026](https://img.shields.io/badge/Smart%20India%20Hackathon-2026-blue)]()
[![Problem Statement](https://img.shields.io/badge/Problem%20Statement-26131-blue)]()
[![Domain](https://img.shields.io/badge/Domain-Agriculture%20%7C%20FoodTech-green)]()
[![Backend](https://img.shields.io/badge/Backend-FastAPI-009688)]()
[![AI](https://img.shields.io/badge/AI-YOLO%20%7C%20CNN-red)]()
[![Database](https://img.shields.io/badge/Database-PostgreSQL-blue)]()

---

## Overview

The AI-Powered Crop Disease & Pest Early Detection and Management System is a
software-based crop-health decision-support platform designed to assist
farmers, extension workers, agricultural experts, and government officials.

The platform combines image-based disease and pest detection with weather,
crop, location, pest, and historical data to assess crop-health risk and
provide verified, Integrated Pest Management (IPM)-based recommendations.

Uncertain or high-severity cases can be routed to experts for validation,
while geographically tagged cases can be aggregated to identify potential
disease hotspots.

The system is designed as a centralized web/mobile application backed by a
server-side AI inference and business-logic layer. No edge hardware is
required.

---

## Problem Statement

### Smart India Hackathon 2026

**Problem Statement ID:** 26131

**Title:** Early detection and management of crop diseases and pest infestations

**Organisation:** Government of Maharashtra

**Department:** Maharashtra State Innovation Society, Department of Skills,
Employment, Entrepreneurship and Innovation

**Category:** Software

**Theme:** Agriculture, FoodTech & Rural Development

Farmers often identify crop diseases or pest infestations only after visible
damage has already spread. Weather conditions, crop stage, variety, soil
conditions, and local pest history can also influence disease risk but are
often considered independently.

The proposed system addresses this gap by bringing image-based detection,
environmental intelligence, risk assessment, expert validation, and
management guidance into a single platform.

---

## Objectives

The primary objectives of the system are to:

- Detect possible crop diseases and pest infestations from images.
- Incorporate weather and agricultural context into risk assessment.
- Provide Low, Medium, and High crop-health risk levels.
- Generate verified IPM-based management recommendations.
- Support multilingual explanation of advisories.
- Enable expert validation of uncertain cases.
- Map geographically distributed cases to identify potential hotspots.
- Provide regional analytics for agriculture officials.
- Support follow-up monitoring of crop-health conditions.

---

## Core Concept

The system follows a central decision-support pipeline:

```text
Detect
   |
   v
Score
   |
   v
Fetch Weather
   |
   v
Combine Context
   |
   v
Assess Risk
   |
   v
Generate Advisory
   |
   v
Expert Validation
   |
   v
Follow-up Monitoring

```

## System Architecture

                    ┌─────────────────────────┐
                    │      Farmer / User      │
                    │   Web / Mobile Client   │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │      Backend API        │
                    │        FastAPI          │
                    └────────────┬────────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                  │
              ▼                  ▼                  ▼
       ┌─────────────┐    ┌─────────────┐    ┌──────────────┐
       │ AI Disease  │    │   Weather   │    │ Crop / Farm  │
       │ & Pest      │    │     API     │    │    Data      │
       │ Detection   │    │             │    │              │
       └──────┬──────┘    └──────┬──────┘    └──────┬───────┘
              │                  │                  │
              └──────────────────┼──────────────────┘
                                 ▼
                    ┌─────────────────────────┐
                    │       Risk Engine       │
                    │   Low / Medium / High   │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │     Advisory Engine     │
                    │     Verified IPM KB      │
                    └────────────┬────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
                    ▼                         ▼
          ┌──────────────────┐      ┌──────────────────┐
          │ Expert Validation│      │ Multilingual LLM │
          └────────┬─────────┘      └────────┬─────────┘
                   │                         │
                   └────────────┬────────────┘
                                ▼
                    ┌─────────────────────────┐
                    │       Database          │
                    │ Cases / Predictions /   │
                    │ Weather / Advisories    │
                    └────────────┬────────────┘
                                 │
                 ┌───────────────┴────────────────┐
                 ▼                                ▼
        ┌──────────────────┐             ┌──────────────────┐
        │ Hotspot Mapping  │             │ Officer Dashboard│
        │                  │             │ & Analytics      │
        └──────────────────┘             └──────────────────┘


## Setup

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Lint with oxlint |

## Structure

```
public/            Static files served as-is
src/
  assets/          Images, fonts, icons imported by components
  components/      Reusable UI components
  pages/           Route-level screens
  hooks/           Custom React hooks
  services/        API clients and data fetching
  utils/           Helper functions
  App.jsx          Root component
  main.jsx         Entry point
  index.css        Global styles
index.html         HTML shell
vite.config.js     Vite config
```
