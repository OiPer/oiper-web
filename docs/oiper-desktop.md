# OiPer Desktop

## Overview

OiPer is a privacy-first voice-to-text desktop application designed for speed, efficiency, and user control. Simply **hold a global hotkey to record**, **release to transcribe**, and the result is instantly injected into your active application.

### Core Philosophy

We focus on three pillars:

- **User Experience**: Fast, seamless, and intuitive workflow
- **Performance**: Native code implementation for maximum speed and efficiency
- **Privacy**: Runs entirely on your machine by default with optional online services

---

## 🎯 Core Features

### Quick Recording & Transcription

- Global hotkey activation (press and release workflow)
- Instant text injection into active applications
- Optional local or online text cleanup

### Privacy-First Architecture

- Transcription runs locally on your machine
- Activity logs and audio stay on-device
- No data is sent anywhere without your explicit choice

### Flexibility & Control

- Local or online text optimization
- Choose your preferred backend (auto/cpu/gpu)
- Support for multiple LLMs for enhanced accuracy

---

## 🔐 Privacy & Security

### Local Processing

- Transcription runs locally on your machine
- Activity logs and audio remain on-device
- Full control over your data

### Online Services (Optional)

- Online optimization is completely optional
- Requires your API key
- Your choice to enable or disable at any time

---

## ⚙️ Settings & Configuration

### Speech & Model Management

- Speech model selection with easy downloads
- Support for various model sizes and types

### Backend Preferences

- Auto detection
- CPU-only mode
- GPU acceleration (where available)

### Online Provider Configuration

- Custom base URL setup
- API key management
- Model name configuration
- Text optimization: choose local or online processing

---

## ⚡ Performance

### Speed & Efficiency

- Extremely fast performance (written in native code)
- GPU acceleration where available
- Very low latency
- Minimal resource usage

### Benchmarks (30 sec English audio)

| Solution              | Time        |
| --------------------- | ----------- |
| **OiPer Desktop**     | **1.5s** ⭐ |
| Lemonfox API          | 3.27s       |
| Python Faster-Whisper | 3.55s       |
| OpenAI Whisper 1 API  | 6.46s       |

**OiPer achieves the fastest transcription while maintaining high quality and keeping data on your device.**
