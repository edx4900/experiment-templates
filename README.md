# Experiment Templates Extension for VS Code

This VS Code extension simplifies the workflow for scientists and researchers by providing a quick and easy way to copy experimental preparation notebook templates directly into their working directory.

## Features

- **Template Selection**: Choose from a variety of predefined experiment preparation templates, including buffer preparation, concentration calculations, and more.
- **Automatic Directory Handling**: Automatically creates a `templates` directory within the current experiment's directory, keeping your workspace organized.
- **Markdown Link Insertion**: For easy access, a markdown link to the copied template is inserted into your currently open file.

## Available Templates

- **Buffer Guide**: `buffer_prep.ipynb` - A comprehensive guide for preparing various buffer solutions.
- **Concentration Calculator**: `general_conc_calc.ipynb` - Handy tool for calculating the concentrations needed for your experiments.
- **MetTy Concentration**: `metTy_conc.ipynb` - Specialized template for calculating MetTy concentrations.
- **OxyTy Concentration Assay**: `oxyTy_conc_assay.ipynb` - Detailed procedure for conducting OxyTy concentration assays.
- **Substrate Dilutions**: `substrate_dilution_prep.ipynb` - Step-by-step guide for preparing substrate dilutions.

## Usage

1. Open the command palette (`Cmd+Shift+P` on macOS or `Ctrl+Shift+P` on Windows/Linux).
2. Type `Copy Experiment Template` and select the command.
3. Choose a template from the quick pick list.
4. The selected template will be copied to a `templates` directory within the current experiment's directory, and a markdown link will be inserted in your currently active file.
