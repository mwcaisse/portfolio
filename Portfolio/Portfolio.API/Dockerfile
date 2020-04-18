FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build

WORKDIR /build/src

COPY . .

RUN dotnet restore
RUN dotnet publish -c Release -o /build/out

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 as runtime

WORKDIR /app

COPY --from=build /build/out ./

ENTRYPOINT ["dotnet", "Portfolio.API.dll"]