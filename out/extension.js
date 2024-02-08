"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// This method is called when your extension is activated
function activate(context) {
    let disposable = vscode.commands.registerCommand('experiment-templates.copyTemplate', async () => {
        const templatesDir = '/Users/eleanordunietz/Desktop/Stanford/experimentTemplates/experimentalPrep';
        if (!fs.existsSync(templatesDir)) {
            vscode.window.showErrorMessage("Templates directory not found.");
            return;
        }
        const files = fs.readdirSync(templatesDir);
        const fileMap = {
            'buffer_prep.ipynb': 'Buffer Guide',
            'general_conc_calc.ipynb': 'Concentration Calculator',
            'metTy_conc.ipynb': 'MetTy Concentration',
            'oxyTy_conc_assay.ipynb': 'OxyTy Concentration Assay',
            'substrate_dilution_prep.ipynb': 'Substrate Dilutions',
        };
        const fileOptions = files.map(file => ({
            label: fileMap[file] || file,
            detail: file,
        }));
        const selectedTemplateOption = await vscode.window.showQuickPick(fileOptions, {
            placeHolder: 'Select a template to copy',
        });
        if (!selectedTemplateOption) {
            return;
        }
        const selectedTemplate = selectedTemplateOption.detail;
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage("No file open.");
            return;
        }
        const currentFilePath = editor.document.uri.fsPath;
        const currentFileDir = path.dirname(currentFilePath);
        // Assuming the parent directory of the current file is the experiment ID
        const expId = path.basename(currentFileDir);
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage("No workspace folder found.");
            return;
        }
        const workspaceRootPath = workspaceFolders[0].uri.fsPath;
        // Directly use the currentFileDir as the base for the templates directory
        let destinationDir = path.join(currentFileDir, 'templates');
        // If the currentFileDir is already inside an 'expId' directory, use it directly
        if (path.basename(workspaceRootPath) === expId) {
            destinationDir = path.join(workspaceRootPath, 'templates');
        }
        const sourcePath = path.join(templatesDir, selectedTemplate);
        const destinationPath = path.join(destinationDir, selectedTemplate);
        if (!fs.existsSync(destinationDir)) {
            fs.mkdirSync(destinationDir, { recursive: true });
        }
        fs.copyFileSync(sourcePath, destinationPath);
        const markdownLink = `[${selectedTemplateOption.label}](${destinationPath})`;
        editor.edit(editBuilder => {
            editBuilder.insert(editor.selection.start, markdownLink);
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map