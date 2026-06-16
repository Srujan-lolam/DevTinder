# Front-End Developer Agent — Implementation Guide

## Agent Activation
This agent is activated when:
1. User requests frontend feature implementation
2. Component files are being modified
3. Build synchronization is needed
4. Element metadata needs updating

## Execution Checklist

### Before Starting
- [ ] Verify `elementsDataSMBU.json` exists and is valid JSON
- [ ] Verify `elementsDataReEngineering.json` exists and is valid JSON
- [ ] Check git repository is initialized
- [ ] Ensure npm/yarn is available

### Phase 1: File Detection
```bash
# Command to use
git status --porcelain
```

**Parse output:**
- Lines starting with `??` = untracked
- Lines starting with `M` = modified
- Lines starting with `A` = added
- Lines starting with `D` = deleted

**Extract filePath:** Take everything after the status code

**Ignore:**
- `.git/` directory
- `node_modules/`
- Commit history (use `git diff` for working directory only)

### Phase 2: JSON Matching Algorithm

```javascript
const matchElements = (changedFiles, smbuData, reEngData) => {
  const smbuMatches = [];
  const reEngMatches = [];
  
  for (const filePath of changedFiles) {
    // Search SMBU
    for (const [key, obj] of Object.entries(smbuData)) {
      if (obj.filePath === filePath) {
        smbuMatches.push({ key, ...obj });
      }
    }
    
    // Search ReEngineering
    for (const [key, obj] of Object.entries(reEngData)) {
      if (obj.filePath === filePath) {
        reEngMatches.push({ key, ...obj });
      }
    }
  }
  
  return { smbuMatches, reEngMatches };
};
```

### Phase 3: Dataset Rebuild Rules

**Priority Order:**
1. Keep ALL ReEngineering entries as-is
2. Add SMBU entries that don't exist in ReEngineering (by fileName)
3. Never delete or modify existing ReEngineering entries
4. Never overwrite ReEngineering with SMBU data

**Validation:**
- [ ] Valid JSON syntax
- [ ] All required keys present (filePath, fileName, elName)
- [ ] No duplicate keys
- [ ] All filePaths exist in workspace

### Phase 4: Summary Display Format

```
╔══════════════════════════════════════════════════════════╗
║       FRONTEND BUILD SYNCHRONIZATION SUMMARY             ║
╠══════════════════════════════════════════════════════════╣
║ Status:           ✓ READY FOR BUILD                     ║
║ Timestamp:        2026-06-16 10:30:00                   ║
╠══════════════════════════════════════════════════════════╣
║ Changed Files:    N                                      ║
║ SMBU Matches:     M                                      ║
║ ReEng Matches:    P                                      ║
║ Final Entries:    Q                                      ║
║ Removed:          R                                      ║
╠══════════════════════════════════════════════════════════╣
║ JSON Updated:     elementsDataReEngineering.json         ║
║ Status:           ✓ Valid JSON                          ║
╚══════════════════════════════════════════════════════════╝
```

### Phase 5: User Approval Flow

**Display:**
```
ReEngineering dataset has been updated based on local changes.

Summary:
- Updated Q total entries
- Added M new entries from SMBU
- Preserved P existing entries

Ready to build? (Yes/No)
```

**If Yes:**
- Proceed to build execution
- Run: `npm run build-all-elements`

**If No:**
- Cancel operation
- Offer to review changes
- Ask what needs adjustment

## Error Handling

| Error | Solution |
|-------|----------|
| Invalid JSON in SMBU | Show error line, ask to fix |
| Invalid JSON in ReEng | Show error line, ask to fix |
| filePath doesn't exist | Warn but continue (file may be new) |
| Build script not found | Suggest alternatives (build, dev build, etc) |
| User denies approval | Stop execution, offer review |
| Git not available | Exit gracefully, explain requirement |

## Output Examples

### Successful Execution
```
✓ Phase 1: Detected 5 changed files
✓ Phase 2: Matched 3 SMBU + 2 ReEng entries
✓ Phase 3: Rebuilt dataset (5 entries total)
✓ Phase 4: Validation passed
→ Ready for Phase 5: Build execution

Proceed with build? [Yes/No]
```

### With Issues
```
⚠ Phase 1: Detected 5 changed files
✓ Phase 2: Matched 2 SMBU + 3 ReEng entries
✗ Phase 3: ERROR - Invalid JSON in elementsDataSMBU.json
  Line 15: Expected comma, got closing brace
  
Fix the JSON and try again.
```

## Advanced Options

### Manual Override
```bash
# Skip sync, go directly to build
npm run build-all-elements -- --skip-sync
```

### Validation Only
```bash
# Check without building
npm run validate-elements
```

### Rollback
```bash
# Restore previous element config
git checkout elementsDataReEngineering.json
```

## Performance Tips
- Cache JSON reads when possible
- Use streaming for large files
- Parallelize file operations where safe
- Show progress indicators for long operations

## Integration Points
This agent works with:
- **Git workflow** — Detects staged/unstaged changes
- **Package.json** — Reads and executes build scripts
- **Vue ecosystem** — Validates Vue component structure
- **JSON validators** — Ensures data integrity
