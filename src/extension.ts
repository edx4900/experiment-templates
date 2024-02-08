import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('experiment-templates.copyTemplate', async () => {
        const templatesDir = '/Users/eleanordunietz/Desktop/Stanford/experimentTemplates/experimentalPrep';

        if (!fs.existsSync(templatesDir)) {
            vscode.window.showErrorMessage("Templates directory not found.");
            return;
        }

        const files = fs.readdirSync(templatesDir);

        const fileMap: { [key: string]: string } = {
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

// This method is called when your extension is deactivated
export function deactivate() {}
