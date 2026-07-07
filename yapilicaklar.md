1. Yeni agent ekle
   prompts/task_distributor.md

2. Yeni orchestrator ekle
   func/orchestrator/runTaskDistributor.js

3. Distributor modülü ekle
   func/distributor/distributeTasks.js
   func/distributor/validateTasks.js

4. Worker modülü ekle
   func/workers/buildWorkerContext.js
   func/workers/runCoderWorker.js

5. Operation merge ekle
   func/operations/mergeOperations.js

6. Pipeline’a experimental branch ekle
   runPipeline.js içinde:
   - single coder mode
   - worker pool mode

7. Config ekle
   aiAgentConfig.js içine:
   CODER_MODE: "single" | "pool"
   MAX_CODER_WORKERS: number

8. Prompt güncelle
   coder.md worker task mantığını desteklesin
   validator.md merged operations mantığını desteklesin

9. Test ekle
   func/testing/testTaskDistributor.js
   func/testing/testWorkerContext.js
   func/testing/testMergeOperations.js

10. Docs güncelle
   docs/architecture/pipeline.md
   docs/architecture/agents.md
   docs/architecture/decisions.md
   docs/architecture/versions.md

Aşama 1
Task Distributor prompt + runTaskDistributor

Aşama 2
Task schema + validateTasks

Aşama 3
Worker context + runCoderWorker

Aşama 4
mergeOperations

Aşama 5
Experimental pipeline bağlantısı

Aşama 6
Testler

Aşama 7
Docs güncellemesi