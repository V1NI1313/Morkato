#include <iostream>
#include <thread>
#include <cstdio>

void runCommand(const char* command) {
  std::system(command);
}

int main() {
  std::thread backend(runCommand, "cd Backend && yarn dev:server");
  std::thread bot(runCommand, "cd Bot && python3 Index.py");
  backend.join();
  bot.join();

  return 0;
}